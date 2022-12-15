const { SlashCommandBuilder } = require("discord.js");

const clanCreationCommand = new SlashCommandBuilder()
  .setName("clanCreate")
  .setDescription("Создайте свой клан!")
  .addStringOption((option) =>
    option.setName("clanName").setDescription("Имя клана").setRequired(true)
  );

module.exports = clanCreationCommand.toJSON();
