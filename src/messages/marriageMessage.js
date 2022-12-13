const {
  AttachmentBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const nodeHtmlToImage = require("node-html-to-image");
const creationUserInDatabase = require("../events/creationUserInDatabase");
const Couple = require("../db/coupleSchema");

module.exports = async (interaction) => {
  await creationUserInDatabase(interaction.user);
  await interaction.deferReply();

  let couple = await Couple.findOne({
    $or: [
      { discordFirstId: interaction.user.id },
      { discordSecondId: interaction.user.id },
    ],
    coupleConfirm: true,
  });

  if (couple !== null) {
    var _htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <style>
    	h1, h2 {
    		padding: 0;
        margin: 0;
    	}
      body {
        font-family: "Poppins", Arial, Helvetica, sans-serif;
        background-image: url(${couple?.coupleBackground});
        background-size: cover;
        background-position: center;
        color: #fff;
        font-size: 9px;
        min-width: 900px;
        text-align: center
      }
      .flex {
        display: flex;
        flex-direction: column;
        padding: 25px;
        justify-content: space-around;
      }
      .row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 20px;
      }
      .box {
        margin-bottom: 30px;
        padding: 10px;
        height: 170px;
        width: 200px;
        background-color: ${couple?.coupleBox};
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
      	padding: 10px 20px 20px 20px;
      	display: block;
      	height: 200px;
        width: 550px;
        font-size: 19px;
        word-wrap: break-word;
      }
      .h1 {
      	font-size: 21px;
        margin-top: 10px;
        margin-bottom: 10px;
      }
      .h1-status {
        font-size: 21px;
      }
      .input {
      	width: 250px;
        height: 150px;
      }
      .suptitle {
      	font-size: 40px;
        margin-top: 30px;
      }
    </style>
  </head>
  <body>
    <div class="flex">
        <div class="row">
          <div class="box image">
            <img class="image" src=${
              couple?.discordFirstAvatar !== null
                ? `https://cdn.discordapp.com/avatars/${couple?.discordFirstId}/${couple?.discordFirstAvatar}.jpeg`
                : "https://cdn.discordapp.com/embed/avatars/0.png"
            } /> 
          </div>
          <div class="box image">
            <img class="image" src=${
              couple?.discordSecondAvatar !== null
                ? `https://cdn.discordapp.com/avatars/${couple?.discordSecondId}/${couple?.discordSecondAvatar}.jpeg`
                : "https://cdn.discordapp.com/embed/avatars/0.png"
            } /> 
          </div>
        </div>
        
        <div class="row">
        	<div class="box status">
            	<h1 class="h1 h1-status">Статус пары</h1>
                <h2 class="">${couple?.coupleStatus}</h2>
        	</div>
        </div>
        
        <div class="row">
        	<div class="box input">
            	<h1 class="h1">Инвентарь пары</h1>
                <h2 class="suptitle">${couple?.coupleEquipment.length}</h2>
        	</div>
            <div class="box input">
            	<h1 class="h1">Баланс пары</h1>
                <h2 class="suptitle">${couple?.coupleBalance}</h2>
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
            .setCustomId("marriageBgEdit")
            .setLabel("Изменить фон")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("🎨")
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("marriageStatusEdit")
            .setLabel("Изменить статус")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("🖊️")
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("equipment-marriage")
            .setLabel("Пополнить инвентарь")
            .setStyle(ButtonStyle.Success)
            .setEmoji("📦")
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("balance-marriage")
            .setLabel("Пополнить баланс")
            .setStyle(ButtonStyle.Success)
            .setEmoji("💸")
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
  } else {
    await interaction.editReply({
      content: `<@${interaction.user.id}>, У вас нет брака или он не подтвержден`,
    });
  }
};
