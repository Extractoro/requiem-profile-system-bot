const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle("Смена background")
    .setCustomId("background-modal")
    .setComponents(
      new ActionRowBuilder().setComponents(
        new TextInputBuilder()
          .setLabel("Ссылка на фон")
          .setCustomId("editBackground")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      )
    );

  await interaction.showModal(modal);
};
