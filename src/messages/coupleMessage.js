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

  const _htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background-image: url(${user.userBackground});
        background-size: cover;
        background-position: center;
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
        word-wrap: break-word;
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
        font-size: 30px;
      }
      .box-side {
      	margin-bottom: 30px;
        padding: 10px;
        height: 280px;
        width: 200px;
        background-color: #435;
        word-wrap: break-word;
      }
      .h1 {
      	font-size: 25px;
      }
    </style>
  </head>
  <body>
    <div class="flex">
        <div class="row">
          <div class="box-side">
            <h1 class="">В браке с</h1>
            <h2 class="suptitle">${user.userMarriageWith}</h2>
          </div>
          <div class="box-side">
            <h1 class="">Инвентарь</h1>
            <h2 class="suptitle">${user.userEquipment.length}</h2>
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
          <div class="box-side">
            <h1 class="">Нравиться</h1>
            <h2 class="suptitle">${user.userLike}</h2>
          </div>
          <div class="box-side">
            <h1 class="">Подарено</h1>
            <h2 class="suptitle">?</h2>
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
          .setCustomId("equipment-marriage")
          .setLabel("Инвентарь пары")
          .setStyle(ButtonStyle.Success)
          .setEmoji("📦")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("marriage")
          .setLabel("Отношения")
          .setStyle(ButtonStyle.Primary)
          .setEmoji("💞")
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
