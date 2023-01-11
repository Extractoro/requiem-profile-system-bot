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
      content: "Вы не состоите в клане",
      ephemeral: true,
    });
  }

  if (clan) {
    if (clan.clanBans.length === 0) {
      return await interaction.reply({
        content: "У вас нет банов в клане",
        ephemeral: true,
      });
    }

    if (clan.clanBans.length !== 0) {
      return await interaction.reply({
        content: `Баны клана __**${clan.clanName}**__.
        ${clan.clanBans.map(
          (user) =>
            `\n${user.userName}#${user.userDiscriminator} (${user.userId})`
        )}`,
      });
    }
  }
};
