const { SlashCommandBuilder } = require("discord.js");

const coupleCommand = new SlashCommandBuilder()
  .setName("couple")
  .setDescription(
    "Покажите вашу симпатию и, возможно, вы станете отличной парой"
  )
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("Выберите человека, который вам нравиться")
      .setRequired(true)
  );

module.exports = coupleCommand.toJSON();
