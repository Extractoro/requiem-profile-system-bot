const Couple = require("../../db/coupleSchema");

module.exports = async (interaction) => {
  let couple = await Couple.findOne({
    $or: [
      { discordFirstId: interaction.user.id },
      { discordSecondId: interaction.user.id },
    ],
  });

  const result = await Couple.findByIdAndUpdate(
    couple?._id,
    {
      coupleBackground: interaction.fields.getTextInputValue("editBg"),
    },
    {
      new: true,
    }
  );

  await result.save().catch(console.error);

  await interaction.reply({
    content: "Ваш фон пары успешно изменен.",
    ephemeral: true,
  });
};
