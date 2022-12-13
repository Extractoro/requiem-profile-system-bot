const {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = async (interaction) => {
  const modal = new ModalBuilder()
    .setTitle("Смена фона и цвета бокса")
    .setCustomId("userBgEdit")
    .setComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setLabel("Ссылка на фон")
          .setCustomId("editBg")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setLabel("Цвет бокса, hex (Пример: #ffffff)")
          .setCustomId("editBox")
          .setStyle(TextInputStyle.Short)
          .setRequired(false)
      )
    );

  await interaction.showModal(modal);
};
