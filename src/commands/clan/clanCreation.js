const { SlashCommandBuilder } = require("discord.js");

const clanCreationCommand = new SlashCommandBuilder()
  .setName("create-clan")
  .setDescription("Создайте свой клан!")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Имя клана")
      .setRequired(true)
      .setMinLength(5)
  );

module.exports = clanCreationCommand.toJSON();
