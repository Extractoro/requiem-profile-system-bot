const { SlashCommandBuilder } = require("discord.js");

const clanRequests = new SlashCommandBuilder()
  .setName("requests")
  .setDescription("Узнать о запросах на вход клана");

module.exports = clanRequests.toJSON();
