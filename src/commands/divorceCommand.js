const { SlashCommandBuilder } = require("discord.js");

const divorceCommand = new SlashCommandBuilder()
  .setName("divorce")
  .setDescription("Divorce command");

module.exports = divorceCommand.toJSON();
