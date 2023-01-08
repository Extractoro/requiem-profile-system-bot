const Couple = require("../../db/coupleSchema");

module.exports = async (interaction) => {
  let couple = await Couple.findOne({
    $or: [
      { discordFirstId: interaction.user.id },
      { discordSecondId: interaction.user.id },
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
      return couple.coupleBox;
    } else {
      return interaction?.fields?.getTextInputValue("editBox");
    }
  }

  function bg() {
    if (interaction?.fields?.getTextInputValue("editBg") === "") {
      return couple.coupleBackground;
    } else {
      return interaction?.fields?.getTextInputValue("editBg");
    }
  }

  const result = await Couple.findByIdAndUpdate(
    couple?._id,
    {
      coupleBackground: bg(),
      coupleBox: colorBox(),
    },
    {
      new: true,
    }
  );

  await result.save().catch(console.error);

  return await interaction.reply({
    content: "Ваш фон пары успешно изменен.",
    ephemeral: true,
  });
};
