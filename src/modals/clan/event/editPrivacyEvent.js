const Clan = require("../../../db/clanSchema");

module.exports = async (interaction) => {
  let clan = await Clan.findOne({
    $or: [
      { clanOwnerId: interaction.user.id },
      { clanHelperId: interaction.user.id },
    ],
  });

  function privacyCheck() {
    if (
      interaction?.fields?.getTextInputValue("editPrivacy") === "open" ||
      interaction?.fields?.getTextInputValue("editPrivacy") === "close" ||
      interaction?.fields?.getTextInputValue("editPrivacy") === "request"
    ) {
      return interaction?.fields?.getTextInputValue("editPrivacy");
    } else {
      return clan.clanPrivacy;
    }
  }

  if (!clan) {
    await interaction.reply({
      content: "Вы не состоите в клане или у вас нет прав на редактирование.",
      ephemeral: true,
    });
  }

  if (clan) {
    const result = await Clan.findByIdAndUpdate(
      clan?._id,
      { clanPrivacy: privacyCheck() },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);

    await interaction.reply({
      content: "Ваша приватность клана изменена!",
      ephemeral: true,
    });
  }
};
