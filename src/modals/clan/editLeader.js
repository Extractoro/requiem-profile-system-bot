const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle(`Смена leader`)
    .setCustomId(`leader-modal`)
    .setComponents(
      new ActionRowBuilder().setComponents(
        new TextInputBuilder()
          .setLabel("ID человека")
          .setCustomId("editLeader")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      )
    );

  await interaction.showModal(modal);
};
