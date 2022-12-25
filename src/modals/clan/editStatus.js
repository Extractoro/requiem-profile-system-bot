const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle("Смена статуса")
    .setCustomId("status-modal")
    .setComponents(
      new ActionRowBuilder().setComponents(
        new TextInputBuilder()
          .setLabel("Статус")
          .setCustomId("editStatus")
          .setStyle(TextInputStyle.Paragraph)
          .setMaxLength(200)
      )
    );

  await interaction.showModal(modal);
};
