const { SlashCommandBuilder } = require("discord.js");

const marriageCommand = new SlashCommandBuilder()
  .setName("marriage")
  .setDescription("Сыграйте наконец-то свадьбу!")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Выберите человека, с которым вы хотите заключить брак")
      .setRequired(true)
  );

module.exports = marriageCommand.toJSON();
