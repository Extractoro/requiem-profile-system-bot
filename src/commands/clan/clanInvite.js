const { SlashCommandBuilder } = require("discord.js");

const clanInvite = new SlashCommandBuilder()
  .setName("invite")
  .setDescription("Пригласить человека в свой клан.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Человек, которого хотите приласить")
      .setRequired(true)
  );

module.exports = clanInvite.toJSON();
