const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Couple = require("../db/coupleSchema");

module.exports = async (interaction, userSelected) => {
  const couple = await Couple.findOne({
    $or: [
      { discordFirstId: interaction.user.id },
      { discordSecondId: userSelected.id },
    ],
  });

  // если уже есть брак - запретить

  if (couple.coupleConfirm === false) {
    await interaction.reply({
      content: `<@${couple.discordSecondId}>, готов(-а) ли ты, вступить в брак с <@${couple.discordFirstId}>?`,
      components: [
        new ActionRowBuilder().setComponents(
          new ButtonBuilder()
            .setCustomId("marriage-yes")
            .setLabel("Да")
            .setStyle(ButtonStyle.Success)
            .setEmoji("🥰")
            .setDisabled(false),
          new ButtonBuilder()
            .setCustomId("marriage-no")
            .setLabel("Нет")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("😞")
            .setDisabled(false)
        ),
      ],
    });
  }
};
