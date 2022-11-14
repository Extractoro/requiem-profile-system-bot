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
        background-color: ${user.userBackground};
        color: #fff;
        font-size: 12px;
        min-width: 900px;
        text-align: center;
        
      }
      .flex {
        display: flex;
        flex-direction: row;
        padding: 25px;
        justify-content: space-around;
      }
      .row {
        display: flex;
        align-items: center;
        flex-direction: column;
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
        height: 250px;
        width: 250px;
      }
      .status {
      	margin-top: 10px;
      	height: 215px;
        width: 250px;
        font-size: 9px;
      }
      .nickname {
      	height: 35px;
        width: 250px;
        font-size: 9px;
      }
      .suptitle {
      	font-size: 25px;
      }
    </style>
  </head>
  <body>
    <div class="flex">
        <div class="row">
          <div class="box">
            <h1 class="">Баланс</h1>
            <h2 class="suptitle">$${user.userBalance}</h2>
          </div>
          <div class="box">
            <h1 class="">Брак</h1>
            <h2 class="suptitle">${user.userMarriage}</h2>
          </div>
          <div class="box">
            <h1 class="">Рейтинг по чату</h1>
            <h2 class="suptitle">${indexUserChatPoints + 1} (${
    user.userChatPoints
  })</h2>
          </div>
        </div>

        <div class="row">
          <div class="box image">
            <img class="image" src=${
              user.discordAvatar !== null
                ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.jpeg`
                : "https://cdn.discordapp.com/embed/avatars/0.png"
            } /> 
          </div>
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

        <div class="row">
          <div class="box">
            <h1 class="">Предметов в инвентаре</h1>
            <h2 class="suptitle">${user.userEquipment.length}</h2>
          </div>
          <div class="box">
            <h1 class="">Клан</h1>
            <h2 class="suptitle">${user.userClan}</h2>
          </div>
          <div class="box">
            <h1 class="">Рейтинг по войсу</h1>
            <h2 class="suptitle">${indexUserVoicePoints + 1} (${
    user.userVoicePoints
  })</h2>
          </div>
        </div>
    </div>
  </body>
</html>
`;

  const images = await nodeHtmlToImage({
    html: _htmlTemplate,
    quality: 200,
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
          .setCustomId("replenish")
          .setLabel("Пополнить")
          .setStyle(ButtonStyle.Success)
          .setEmoji("💸")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("clan")
          .setLabel("Клан")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("🏰")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("rating")
          .setLabel("Рейтинг")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("⚔")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("couple")
          .setLabel("Пара")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("💞")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("edit")
          .setLabel("Редактировать")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("📝")
          .setDisabled(false)
      ),
    ],
  });
};
