const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle(`Смена Name`)
    .setCustomId(`name-modal`)
    .setComponents(
      new ActionRowBuilder().setComponents(
        new TextInputBuilder()
          .setLabel("Имя")
          .setCustomId("editName")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
          .setMinLength(5)
      )
    );

  await interaction.showModal(modal);
};
