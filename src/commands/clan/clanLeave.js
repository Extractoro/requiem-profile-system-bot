const { SlashCommandBuilder } = require("discord.js");

const clanLeave = new SlashCommandBuilder()
  .setName("leave-clan")
  .setDescription("Покиньте клан");

module.exports = clanLeave.toJSON();
