const Clan = require("../../db/clanSchema");

module.exports = async (interaction, clanValue) => {
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
    const result = await Clan.findByIdAndUpdate(
      clan?._id,
      { clanStatus: clanValue },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);

    return await interaction.reply({
      content: "Ваш статус клана изменено!",
      ephemeral: true,
    });
  }
};
