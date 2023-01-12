const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Clan = require("../db/clanSchema");

module.exports = async (interaction, userValue) => {
  const clan = await Clan.findOne({
    clanOwnerId: interaction.user.id,
  });

  for (let user of clan.clanInvitation) {
    if (user.memberId === userValue) {
      return await interaction.reply({
        content: `<@${user.userId}>, вас приглашают в клан <@${clan.clanName}>.`,
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("clan-yes")
              .setLabel("Да")
              .setStyle(ButtonStyle.Success)
              .setEmoji("😚")
              .setDisabled(false),
            new ButtonBuilder()
              .setCustomId("clan-no")
              .setLabel("Нет")
              .setStyle(ButtonStyle.Danger)
              .setEmoji("😞")
              .setDisabled(false)
          ),
        ],
      });
    }
  }
};
