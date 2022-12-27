const Clan = require("../../../db/clanSchema");

module.exports = async (interaction) => {
  let clan = await Clan.findOne({
    $or: [
      { clanOwnerId: interaction.user.id },
      { clanHelperId: interaction.user.id },
    ],
  });

  const getHexadecimalColors = (str) => {
    const hexColor = /#([a-f0-9]{6}|[a-f0-9]{3})\b/gi;
    return str.match(hexColor);
  };

  function colorBox() {
    if (
      getHexadecimalColors(
        interaction?.fields?.getTextInputValue("editBox")
      ) === null
    ) {
      return clan.clanBox;
    } else {
      return interaction?.fields?.getTextInputValue("editBox");
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
      { clanBox: colorBox() },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);

    await interaction.reply({
      content: "Ваш цвет бокса клана изменен!",
      ephemeral: true,
    });
  }
};
