const { SlashCommandBuilder } = require("discord.js");

const clanDelete = new SlashCommandBuilder()
  .setName("delete-clan")
  .setDescription("Удалить свой клан (без возврата и подтверждения)");

module.exports = clanDelete.toJSON();
