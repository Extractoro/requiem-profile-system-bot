const { SlashCommandBuilder } = require("discord.js");

const clanKick = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Выгоните одного из учасников своего клана.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Человек, которого хотите выгнать")
      .setRequired(true)
  );

module.exports = clanKick.toJSON();
