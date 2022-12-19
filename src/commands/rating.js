const { SlashCommandBuilder } = require("discord.js");

const ratingCommand = new SlashCommandBuilder()
  .setName("rating")
  .setDescription("Rating command");

module.exports = ratingCommand.toJSON();
