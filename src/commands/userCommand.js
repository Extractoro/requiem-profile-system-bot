const { SlashCommandBuilder } = require("discord.js");

const userCommand = new SlashCommandBuilder()
  .setName("user")
  .setDescription("User command");

module.exports = userCommand.toJSON();
