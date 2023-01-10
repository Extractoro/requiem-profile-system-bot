const { SlashCommandBuilder } = require("discord.js");

const clanUnban = new SlashCommandBuilder()
  .setName("unban")
  .setDescription("Разблокируйте пользователя для вашего клана.")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Человек, которого хотите разблокировать")
      .setRequired(true)
  );

module.exports = clanUnban.toJSON();
