const { SlashCommandBuilder } = require("discord.js");

const clanDecline = new SlashCommandBuilder()
  .setName("decline")
  .setDescription("Откажите человеку во вступлении в свой клан")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Человек, которого хотите отклонить")
      .setRequired(true)
  );

module.exports = clanDecline.toJSON();
