const User = require("../../db/userSchema");

module.exports = async (interaction) => {
  let user = await User.findOne({ discordId: interaction.user.id });

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
      return user.userBox;
    } else {
      return interaction?.fields?.getTextInputValue("editBox");
    }
  }

  function bg() {
    if (interaction?.fields?.getTextInputValue("editBg") === "") {
      return user.userBackground;
    } else {
      return interaction?.fields?.getTextInputValue("editBg");
    }
  }

  const result = await User.findByIdAndUpdate(
    user?._id,
    {
      userBackground: bg(),
      userBox: colorBox(),
    },
    {
      new: true,
    }
  );

  await result.save().catch(console.error);

  await interaction.reply({
    content: "Ваш фон успешно изменен.",
    ephemeral: true,
  });
};
