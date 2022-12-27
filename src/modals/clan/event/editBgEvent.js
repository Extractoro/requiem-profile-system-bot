const Clan = require("../../../db/clanSchema");

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
    const result = await Clan.findByIdAndUpdate(
      clan?._id,
      { clanAvatar: interaction.fields.getTextInputValue("editBackground") },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);

    await interaction.reply({
      content: "Ваш фон клана изменен!",
      ephemeral: true,
    });
  }
};
