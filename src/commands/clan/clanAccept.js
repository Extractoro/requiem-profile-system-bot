const { SlashCommandBuilder } = require("discord.js");

const clanAccept = new SlashCommandBuilder()
  .setName("accept")
  .setDescription("Принять человека из запросов на вход.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Человек, которого хотите принять")
      .setRequired(true)
  );

module.exports = clanAccept.toJSON();
