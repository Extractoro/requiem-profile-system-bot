const Clan = require("../db/clanSchema.js");

module.exports = async (interaction) => {
  let clan = await Clan.findOne({
    $or: [
      { clanOwnerId: interaction.user.id },
      { clanHelperId: interaction.user.id },
    ],
  });

  if (!clan) {
    await interaction.reply({
      content: "Вы не состоите в клане или у вас нет прав на редактирование.",
      ephemeral: true,
    });
  }

  if (clan) {
    if (clan.clanRequests.length === 0) {
      await interaction.reply({
        content: "У вас нет новых запросов на вступление в клан.",
        ephemeral: true,
      });
    }
  }
};
