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

  const arrUserChatPoints = allUsers.sort(
    (a, b) => b.userChatPoints - a.userChatPoints
  );

  const arrUserVoicePoints = allUsers2.sort(
    (a, b) => b.userVoicePoints - a.userVoicePoints
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
        background-image: url(${user.userBackground});
        background-size: cover;
        background-position: center;
        color: #fff;
        font-size: 12px;
        min-width: 1030px;
        text-align: center;
        
      }
      .flex {
        display: flex;
        flex-direction: column;
        padding: 25px;
        justify-content: space-around;
      }
      .box {
      	width: 900px;
		    height: 680px;
        background-color: #435;
        padding: 40px;
        display: flex;
        justify-content: space-around;
      }
      .one, .two {
      	background-color: #161616;
        width: 400px;
        height: 600px;
        padding: 10px;
      }
      .ol {
      	font-size: 20px;
      }
      .li {
      	padding-bottom: 35px;
        text-align: left;
        padding-left: 5px;
      }
    </style>
  </head>
  <body>
    <div class="flex">
        <div class="box">
        		<div class="section">
        			<h1>Рейтинг по чату (Топ 10)</h1>
                    <div class="one">
                    	<ol class="ol">
                        	<li class="li">${
                            arrUserChatPoints[0]?.discordName.length > 15
                              ? `${arrUserChatPoints[0]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[0]?.discordHashtag
                                } (${arrUserChatPoints[0]?.userChatPoints})`
                              : `${arrUserChatPoints[0]?.discordName}#${arrUserChatPoints[0]?.discordHashtag} (${arrUserChatPoints[0]?.userChatPoints})`
                          }</li>
                          <li class="li">${
                            arrUserChatPoints[1]?.discordName.length > 15
                              ? `${arrUserChatPoints[1]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[1]?.discordHashtag
                                } (${arrUserChatPoints[1]?.userChatPoints})`
                              : `${arrUserChatPoints[1]?.discordName}#${arrUserChatPoints[1]?.discordHashtag} (${arrUserChatPoints[1]?.userChatPoints})`
                          }</li>
                        	<li class="li">${
                            arrUserChatPoints[2]?.discordName.length > 15
                              ? `${arrUserChatPoints[2]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[2]?.discordHashtag
                                } (${arrUserChatPoints[2]?.userChatPoints})`
                              : `${arrUserChatPoints[2]?.discordName}#${arrUserChatPoints[2]?.discordHashtag} (${arrUserChatPoints[2]?.userChatPoints})`
                          }</li>
                        	<li class="li">${
                            arrUserChatPoints[3]?.discordName.length > 15
                              ? `${arrUserChatPoints[3]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[3]?.discordHashtag
                                } (${arrUserChatPoints[3]?.userChatPoints})`
                              : `${arrUserChatPoints[3]?.discordName}#${arrUserChatPoints[3]?.discordHashtag} (${arrUserChatPoints[3]?.userChatPoints})`
                          }</li>
                        	<li class="li">${
                            arrUserChatPoints[4]?.discordName.length > 15
                              ? `${arrUserChatPoints[4]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[4]?.discordHashtag
                                } (${arrUserChatPoints[4]?.userChatPoints})`
                              : `${arrUserChatPoints[4]?.discordName}#${arrUserChatPoints[4]?.discordHashtag} (${arrUserChatPoints[4]?.userChatPoints})`
                          }</li>
                        	<li class="li">${
                            arrUserChatPoints[5]?.discordName.length > 15
                              ? `${arrUserChatPoints[5]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[5]?.discordHashtag
                                } (${arrUserChatPoints[5]?.userChatPoints})`
                              : `${arrUserChatPoints[5]?.discordName}#${arrUserChatPoints[5]?.discordHashtag} (${arrUserChatPoints[5]?.userChatPoints})`
                          }</li>
                        	<li class="li">${
                            arrUserChatPoints[6]?.discordName.length > 15
                              ? `${arrUserChatPoints[6]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[6]?.discordHashtag
                                } (${arrUserChatPoints[6]?.userChatPoints})`
                              : `${arrUserChatPoints[6]?.discordName}#${arrUserChatPoints[6]?.discordHashtag} (${arrUserChatPoints[6]?.userChatPoints})`
                          }</li>
                        	<li class="li">${
                            arrUserChatPoints[7]?.discordName.length > 15
                              ? `${arrUserChatPoints[7]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[7]?.discordHashtag
                                } (${arrUserChatPoints[7]?.userChatPoints})`
                              : `${arrUserChatPoints[7]?.discordName}#${arrUserChatPoints[7]?.discordHashtag} (${arrUserChatPoints[7]?.userChatPoints})`
                          }</li>
                          <li class="li">${
                            arrUserChatPoints[8]?.discordName.length > 15
                              ? `${arrUserChatPoints[8]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[8]?.discordHashtag
                                } (${arrUserChatPoints[8]?.userChatPoints})`
                              : `${arrUserChatPoints[8]?.discordName}#${arrUserChatPoints[8]?.discordHashtag} (${arrUserChatPoints[8]?.userChatPoints})`
                          }</li>
                          <li class="li">${
                            arrUserChatPoints[9]?.discordName.length > 15
                              ? `${arrUserChatPoints[9]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserChatPoints[9]?.discordHashtag
                                } (${arrUserChatPoints[9]?.userChatPoints})`
                              : `${arrUserChatPoints[9]?.discordName}#${arrUserChatPoints[9]?.discordHashtag} (${arrUserChatPoints[9]?.userChatPoints})`
                          }</li>
                        </ol>
                    </div>
        		</div>
                <div class="section">
        			<h1>Рейтинг по войсу (Топ 10)</h1>
                    <div class="two">
                    	<ol class="ol">
                        	<li class="li">${
                            arrUserVoicePoints[0]?.discordName.length > 15
                              ? `${arrUserVoicePoints[0]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[0]?.discordHashtag
                                } (${arrUserVoicePoints[0]?.userVoicePoints})`
                              : `${arrUserVoicePoints[0]?.discordName}#${arrUserVoicePoints[0]?.discordHashtag} (${arrUserVoicePoints[0]?.userVoicePoints})`
                          }</li>
                          <li class="li">${
                            arrUserVoicePoints[1]?.discordName.length > 15
                              ? `${arrUserVoicePoints[1]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[1]?.discordHashtag
                                } (${arrUserVoicePoints[1]?.userVoicePoints})`
                              : `${arrUserVoicePoints[1]?.discordName}#${arrUserVoicePoints[1]?.discordHashtag} (${arrUserVoicePoints[1]?.userVoicePoints})`
                          }</li>
                        	<li class="li">${
                            arrUserVoicePoints[2]?.discordName.length > 15
                              ? `${arrUserVoicePoints[2]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[2]?.discordHashtag
                                } (${arrUserVoicePoints[2]?.userVoicePoints})`
                              : `${arrUserVoicePoints[2]?.discordName}#${arrUserVoicePoints[2]?.discordHashtag} (${arrUserVoicePoints[2]?.userVoicePoints})`
                          }</li>
                        	<li class="li">${
                            arrUserVoicePoints[3]?.discordName.length > 15
                              ? `${arrUserVoicePoints[3]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[3]?.discordHashtag
                                } (${arrUserVoicePoints[3]?.userVoicePoints})`
                              : `${arrUserVoicePoints[3]?.discordName}#${arrUserVoicePoints[3]?.discordHashtag} (${arrUserVoicePoints[3]?.userVoicePoints})`
                          }</li>
                        	<li class="li">${
                            arrUserVoicePoints[4]?.discordName.length > 15
                              ? `${arrUserVoicePoints[4]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[4]?.discordHashtag
                                } (${arrUserVoicePoints[4]?.userVoicePoints})`
                              : `${arrUserVoicePoints[4]?.discordName}#${arrUserVoicePoints[4]?.discordHashtag} (${arrUserVoicePoints[4]?.userVoicePoints})`
                          }</li>
                        	<li class="li">${
                            arrUserVoicePoints[5]?.discordName.length > 15
                              ? `${arrUserVoicePoints[5]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[5]?.discordHashtag
                                } (${arrUserVoicePoints[5]?.userVoicePoints})`
                              : `${arrUserVoicePoints[5]?.discordName}#${arrUserVoicePoints[5]?.discordHashtag} (${arrUserVoicePoints[5]?.userVoicePoints})`
                          }</li>
                        	<li class="li">${
                            arrUserVoicePoints[6]?.discordName.length > 15
                              ? `${arrUserVoicePoints[6]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[6]?.discordHashtag
                                } (${arrUserVoicePoints[6]?.userVoicePoints})`
                              : `${arrUserVoicePoints[6]?.discordName}#${arrUserVoicePoints[6]?.discordHashtag} (${arrUserVoicePoints[6]?.userVoicePoints})`
                          }</li>
                        	<li class="li">${
                            arrUserVoicePoints[7]?.discordName.length > 15
                              ? `${arrUserVoicePoints[7]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[7]?.discordHashtag
                                } (${arrUserVoicePoints[7]?.userVoicePoints})`
                              : `${arrUserVoicePoints[7]?.discordName}#${arrUserVoicePoints[7]?.discordHashtag} (${arrUserVoicePoints[7]?.userVoicePoints})`
                          }</li>
                          <li class="li">${
                            arrUserVoicePoints[8]?.discordName.length > 15
                              ? `${arrUserVoicePoints[8]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[8]?.discordHashtag
                                } (${arrUserVoicePoints[8]?.userVoicePoints})`
                              : `${arrUserVoicePoints[8]?.discordName}#${arrUserVoicePoints[8]?.discordHashtag} (${arrUserVoicePoints[8]?.userVoicePoints})`
                          }</li>
                          <li class="li">${
                            arrUserVoicePoints[9]?.discordName.length > 15
                              ? `${arrUserVoicePoints[9]?.discordName.slice(
                                  0,
                                  13
                                )}...#${
                                  arrUserVoicePoints[9]?.discordHashtag
                                } (${arrUserVoicePoints[9]?.userVoicePoints})`
                              : `${arrUserVoicePoints[9]?.discordName}#${arrUserVoicePoints[9]?.discordHashtag} (${arrUserVoicePoints[9]?.userVoicePoints})`
                          }</li>	
                        </ol>
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
          .setCustomId("back")
          .setLabel("Назад к профилю")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("🔙")
          .setDisabled(false)
      ),
    ],
  });
};
