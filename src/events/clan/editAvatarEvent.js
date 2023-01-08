const Clan = require("../../db/clanSchema");

module.exports = async (interaction, clanUrl) => {
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
      { clanAvatar: clanUrl },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);

    return await interaction.reply({
      content: "Ваш аватар клана изменено!",
      ephemeral: true,
    });
  }
};
