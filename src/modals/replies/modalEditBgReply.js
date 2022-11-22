const User = require("../../db/userSchema");

module.exports = async (interaction) => {
  let user = await User.findOne({ discordId: interaction.user.id });

  const result = await User.findByIdAndUpdate(
    user?._id,
    {
      userBackground: interaction.fields.getTextInputValue("editBg"),
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
