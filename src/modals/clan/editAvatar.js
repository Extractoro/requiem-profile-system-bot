const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle("Смена avatar")
    .setCustomId("avatar-modal")
    .setComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setLabel("Ссылка на аватар")
          .setCustomId("editAvatar")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      )
    );

  await interaction.showModal(modal);
};
