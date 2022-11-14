const { VoiceClient } = require("djs-voice");
const { config } = require("dotenv");
const { Client, GatewayIntentBits } = require("discord.js");

config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const voiceClient = new VoiceClient({
  allowBots: false,
  client: client,
  debug: true,
  mongooseConnectionString: process.env.MONGODB_URL,
});

module.exports = voiceClient;
