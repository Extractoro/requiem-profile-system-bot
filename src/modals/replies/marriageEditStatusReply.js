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
      coupleStatus: interaction.fields.getTextInputValue("editStatus"),
    },
    {
      new: true,
    }
  );

  await result.save().catch(console.error);

  return await interaction.reply({
    content: "Ваш статус пары успешно изменен.",
    ephemeral: true,
  });
};
