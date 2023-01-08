const Clan = require("../db/clanSchema.js");

module.exports = async (interaction) => {
  let clan = await Clan.findOne({
    $or: [
      { clanOwnerId: interaction.user.id },
      { clanHelperId: interaction.user.id },
    ],
  });

  if (!clan) {
    return await interaction.reply({
      content: "Вы не состоите в клане или у вас нет прав на редактирование.",
      ephemeral: true,
    });
  }

  if (clan) {
    if (clan.clanRequests.length === 0) {
      return await interaction.reply({
        content: "У вас нет новых запросов на вступление в клан.",
        ephemeral: true,
      });
    }

    if (clan.clanRequests.length !== 0) {
      return await interaction.reply({
        content: `Запросы на вступление клана __**${clan.clanName}**__.
        ${clan.clanRequests.map(
          (user) =>
            `\n${user.memberName}#${user.memberDiscriminator} (${user.memberId})`
        )}`,
      });
    }
  }
};
