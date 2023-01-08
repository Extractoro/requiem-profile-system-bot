const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (interaction, couple) => {
  return await interaction.reply({
    content: `<@${couple.discordFirstId}>, <@${couple.discordSecondId}> перед вами стоит выбор: разойтись или остаться вместе. Решайте умом, а не чувствами`,
    components: [
      new ActionRowBuilder().setComponents(
        new ButtonBuilder()
          .setCustomId("divorce-yes")
          .setLabel("Да")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("😭")
          .setDisabled(false),
        new ButtonBuilder()
          .setCustomId("divorce-no")
          .setLabel("Нет")
          .setStyle(ButtonStyle.Success)
          .setEmoji("😇")
          .setDisabled(false)
      ),
    ],
  });
};
