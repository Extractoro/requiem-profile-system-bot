const { SlashCommandBuilder } = require("discord.js");

const clanEdit = new SlashCommandBuilder()
  .setName("edit-clan")
  .setDescription("Кастомизируйте свой клан.")
  .addStringOption((option) =>
    option
      .setName("option")
      .setDescription("Выберите, что вы хотите изменить")
      .setRequired(true)
      .setChoices(
        { name: "name", value: "name" },
        { name: "tag", value: "tag" },
        { name: "status", value: "status" },
        { name: "avatar", value: "avatar" },
        { name: "background", value: "background" },
        { name: "box", value: "box" },
        { name: "leader", value: "leader" },
        { name: "helper", value: "helper" },
        { name: "privacy", value: "privacy" },
        { name: "limit", value: "limit" }
      )
  );

module.exports = clanEdit.toJSON();
