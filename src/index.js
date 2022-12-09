const { config } = require("dotenv");
const { connect } = require("mongoose");
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  InteractionType,
} = require("discord.js");

const User = require("./db/userSchema.js");
const userCommand = require("./commands/userCommand.js");
const coupleCommand = require("./commands/coupleCommand.js");
const marriageCommand = require("./commands/marriageCommand.js");
const creationUserInDatabase = require("./events/creationUserInDatabase.js");
const userMessage = require("./messages/userMessage.js");
const ratingMessage = require("./messages/ratingMessage.js");
const voiceClient = require("./client/VoiceClient.js");
const coupleMessage = require("./messages/coupleMessage.js");
const marriageMessage = require("./messages/marriageMessage.js");
const ratingCommand = require("./commands/ratingCommand.js");
const equipmentMessage = require("./messages/equipmentMessage.js");
const userEditMessage = require("./messages/userEditMessage.js");
const userStatusEditModal = require("./modals/userStatusEditModal.js");
const modalEditStatusReply = require("./modals/replies/modalEditStatusReply.js");
const userBgEditModal = require("./modals/userBgEditModal.js");
const modalEditBgReply = require("./modals/replies/modalEditBgReply.js");
const coupleCreate = require("./events/coupleCreate.js");
const marriageCreate = require("./events/marriageCreate.js");
const Couple = require("./db/coupleSchema.js");

config();

const TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const MONGODB_URL = process.env.MONGODB_URL;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.login(TOKEN);
(async () => {
  await connect(MONGODB_URL, { dbName: "db" })
    .then(console.log("Connected!"))
    .catch(console.error);
})();

client.on("ready", () => {
  console.log(`${client.user.username} is ready!`);
});

client.on("guildMemberAdd", async (member) => {
  await creationUserInDatabase(member.user);
});

client.on("messageCreate", async (message) => {
  await creationUserInDatabase(message.author);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  voiceClient.startListener(oldState, newState);
  console.log(newState);
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "user") {
      await userMessage(interaction);
    } else if (interaction.commandName === "rating") {
      await ratingMessage(interaction);
    } else if (interaction.commandName === "couple") {
      const userCoupleSelected = interaction.options.get("user").user;
      await coupleCreate(interaction, userCoupleSelected);
    } else if (interaction.commandName === "marriage") {
      const userMarriageSelected = interaction.options.get("user").user;
      await marriageCreate(interaction, userMarriageSelected);
    }
  } else if (interaction.isButton()) {
    if (interaction.customId === "replenish") {
    } else if (interaction.customId === "clan") {
    } else if (interaction.customId === "equipment") {
      await equipmentMessage(interaction);
    } else if (interaction.customId === "couple") {
      await coupleMessage(interaction);
    } else if (interaction.customId === "userEdit") {
      await userEditMessage(interaction);
    } else if (interaction.customId === "userBgEdit") {
      await userBgEditModal(interaction);
    } else if (interaction.customId === "userStatusEdit") {
      await userStatusEditModal(interaction);
    } else if (interaction.customId === "back") {
      await userMessage(interaction);
    } else if (interaction.customId === "marriage") {
      await marriageMessage(interaction);
    } else if (interaction.customId === "equipment-marriage") {
    } else if (interaction.customId === "marriage-yes") {
      let couple = await Couple.findOne({
        $and: [
          { discordSecondId: interaction.user.id },
          { coupleConfirm: false },
        ],
      });

      if (couple !== null && interaction.user.id === couple.discordSecondId) {
        interaction.reply({
          content: `У нас тут новый брак! Поздравляем <@${couple.discordFirstId}>, <@${couple.discordSecondId}>!`,
        });

        let user1 = await User.findOne({
          discordId: couple.discordFirstId,
        });

        let user2 = await User.findOne({
          discordId: couple.discordSecondId,
        });

        const result = await Couple.findByIdAndUpdate(
          couple?._id,
          { coupleConfirm: true },
          {
            new: true,
          }
        );

        const res1 = await User.findByIdAndUpdate(
          user1?._id,
          {
            userMarriage: "Присутствует",
            userMarriageWith: `${couple.discordSecondName}#${couple.discordSecondHashtag}`,
          },
          {
            new: true,
          }
        );

        const res2 = await User.findByIdAndUpdate(
          user2?._id,
          {
            userMarriage: "Присутствует",
            userMarriageWith: `${couple.discordFirstName}#${couple.discordFirstHashtag}`,
          },
          {
            new: true,
          }
        );

        await result.save().catch(console.error);
        await res1.save().catch(console.error);
        await res2.save().catch(console.error);
      } else {
        interaction.reply({
          content: "Ты не можешь решить за другого! :)",
          ephemeral: true,
        });
      }
    } else if (interaction.customId === "marriage-no") {
      let couple = await Couple.findOne({
        $and: [
          { discordSecondId: interaction.user.id },
          { coupleConfirm: false },
        ],
      });

      if (couple !== null && interaction.user.id === couple.discordSecondId) {
        interaction.reply({
          content: `К сожалению, <@${couple.discordSecondId}> отказал(-а) в браке <@${couple.discordFirstId}>. Не расстраивайся, <@${couple.discordFirstId}>.`,
        });

        await Couple.findByIdAndDelete(couple?._id);
      } else {
        interaction.reply({
          content: "Ты не можешь решить за другого! :)",
          ephemeral: true,
        });
      }
    }
  } else if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.customId === "userStatusEdit") {
      await modalEditStatusReply(interaction);
    } else if (interaction.customId === "userBgEdit") {
      await modalEditBgReply(interaction);
    }
  }
});

async function main() {
  const commands = [userCommand, ratingCommand, coupleCommand, marriageCommand];

  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (err) {
    console.log(err);
  }
}

main();
