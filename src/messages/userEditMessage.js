const {
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const nodeHtmlToImage = require("node-html-to-image");
const User = require("../db/userSchema");
const creationUserInDatabase = require("../events/creationUserInDatabase");

module.exports = async (interaction) => {
  await creationUserInDatabase(interaction.user);
  await interaction.deferReply();

  let user = await User.findOne({ discordId: interaction.user.id });
  let allUsers = await User.find();
  let allUsers2 = await User.find();

  const searchName = `${interaction.user.username}`;
  const searchHash = `${interaction.user.discriminator}`;

  const arrUserChatPoints = allUsers.sort(
    (a, b) => b.userChatPoints - a.userChatPoints
  );

  const arrUserVoicePoints = allUsers2.sort(
    (a, b) => b.userVoicePoints - a.userVoicePoints
  );

  const indexUserChatPoints = arrUserChatPoints.findIndex(
    (el) =>
      `${el.discordName}#${el.discordHashtag}` === `${searchName}#${searchHash}`
  );

  const indexUserVoicePoints = arrUserVoicePoints.findIndex(
    (el) =>
      `${el.discordName}#${el.discordHashtag}` === `${searchName}#${searchHash}`
  );

  const _htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background-color: #161616;
        color: #fff;
        font-size: 9px;
        min-width: 900px;
        text-align: center
      }
      .flex {
        display: flex;
        flex-direction: row;
        padding: 25px;
      }
      .row {
      	margin-left: 100px;
        display: flex;
        align-items: center;
        flex-direction: row;
        width: 250px;
        min-height: 120px;
      }
      .box {
        margin-bottom: 30px;
        padding: 10px;
        height: 170px;
        width: 200px;
        background-color: #435;
      }
      .box:last-child {
        margin-bottom: 0;
      }
      .image {
        border-radius: 50%;
        height: 300px;
        width: 300px;
        margin-right: 50px;
      }
      .status {
        margin-top: 10px;
        height: 215px;
        width: 250px;
      }
      .nickname {
        height: 35px;
        width: 250px;
      }
      .suptitle {
        font-size: 25px;
      }
    </style>
  </head>
  <body>
    <div class="flex">
        <div class="row">
          <div class="box image">
            <img class="image" src=${
              user.discordAvatar !== null
                ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.jpeg`
                : "https://cdn.discordapp.com/embed/avatars/0.png"
            } /> 
          </div>
          <div>
          	<div class="box nickname">
              <h1 class="">${
                interaction.member.nickname !== null
                  ? interaction.member.nickname.length > 15
                    ? `${interaction.member.nickname.slice(0, 13)}...#${
                        user.discordHashtag
                      }`
                    : `${interaction.member.nickname}#${user.discordHashtag}`
                  : user.discordName.length > 15
                  ? `${user.discordName.slice(0, 13)}...#${user.discordHashtag}`
                  : `${user.discordName}#${user.discordHashtag}`
              }</h1>
            </div>
            <div class="box status">
              <h1 class="">${user.userStatus}</h1>
            </div>
          </div>
        </div>
    </div>
  </body>
</html>
`;

  const images = await nodeHtmlToImage({
    html: _htmlTemplate,
    quality: 100,
    type: "png",
    puppeteerArgs: {
      args: ["--no-sandbox"],
    },
    encoding: "buffer",
  });

  const attachment = new AttachmentBuilder(
    images,
    `${interaction.user.username}.jpeg`
  );

  await interaction.editReply({
    files: [attachment],
    components: [
      new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId("userBgEdit")
          .setLabel("Изменить фон")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🎨")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("userStatusEdit")
          .setLabel("Изменить статус")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🖊️")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("back")
          .setLabel("Назад на главную")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("🔙")
          .setDisabled(false)
      ),
    ],
  });
};
