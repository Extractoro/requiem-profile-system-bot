const { SlashCommandBuilder } = require("discord.js");

const clanBan = new SlashCommandBuilder()
  .setName("ban")
  .setDescription(
    "Заблокируйте пользователь для вашего клана (пользователь должен быть в вашем клане)"
  )
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Человек, которого хотите заблокировать")
      .setRequired(true)
  );

module.exports = clanBan.toJSON();
