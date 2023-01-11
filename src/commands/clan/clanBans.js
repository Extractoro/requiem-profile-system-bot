const { SlashCommandBuilder } = require("discord.js");

const clanBans = new SlashCommandBuilder()
  .setName("bans")
  .setDescription("Узнать о банах клана.");

module.exports = clanBans.toJSON();
