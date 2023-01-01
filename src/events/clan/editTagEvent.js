const Clan = require("../../db/clanSchema");

module.exports = async (interaction, clanValue) => {
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
    const result = await Clan.findByIdAndUpdate(
      clan?._id,
      { clanTag: clanValue },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);

    await interaction.reply({
      content: "Ваш тег клана изменено!",
      ephemeral: true,
    });
  }
};
