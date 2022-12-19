const { SlashCommandBuilder } = require("discord.js");

const clanJoin = new SlashCommandBuilder()
  .setName("join-clan")
  .setDescription("Присоединись в чей то клан!")
  .addStringOption((option) =>
    option.setName("name").setDescription("Имя клана").setRequired(true)
  );

module.exports = clanJoin.toJSON();
