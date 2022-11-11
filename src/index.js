const { config } = require("dotenv");
const { connect } = require("mongoose");
const { Client, GatewayIntentBits, REST, Routes } = require("discord.js");

const userCommand = require("./commands/userCommand.js");
const creationUserInDatabase = require("./events/creationUserInDatabase.js");
const userMessage = require("./messages/userMessage.js");

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

client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "user") {
      await userMessage(interaction);
    }
  }
});

async function main() {
  const commands = [userCommand];

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
