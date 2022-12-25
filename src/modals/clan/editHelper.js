const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle(`Смена helper`)
    .setCustomId(`helper-modal`)
    .setComponents(
      new ActionRowBuilder().setComponents(
        new TextInputBuilder()
          .setLabel("ID человека")
          .setCustomId("editHelper")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      )
    );

  await interaction.showModal(modal);
};
