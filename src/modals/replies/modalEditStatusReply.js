const User = require("../../db/userSchema");

module.exports = async (interaction) => {
  let user = await User.findOne({ discordId: interaction.user.id });

  const result = await User.findByIdAndUpdate(
    user?._id,
    {
      userStatus: interaction.fields.getTextInputValue("editStatus"),
    },
    {
      new: true,
    }
  );

  await result.save().catch(console.error);

  await interaction.reply({
    content: "Ваш статус успешно изменен.",
    ephemeral: true,
  });
};
