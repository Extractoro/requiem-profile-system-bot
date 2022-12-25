const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle(`Смена privacy`)
    .setCustomId(`privacy-modal`)
    .setComponents(
      new ActionRowBuilder().setComponents(
        new TextInputBuilder()
          .setLabel(
            "3 способа приватности (open, request, close). Все написаное неподходящее под эти 3 способа будут делать ваш клан открытым для всех (open)"
          )
          .setCustomId("editPrivacy")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      )
    );

  await interaction.showModal(modal);
};
