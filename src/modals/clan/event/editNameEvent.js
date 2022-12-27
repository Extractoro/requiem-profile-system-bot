const Clan = require("../../../db/clanSchema");
const User = require("../../../db/userSchema.js");

module.exports = async (interaction) => {
  let clan = await Clan.findOne({
    $or: [
      { clanOwnerId: interaction.user.id },
      { clanHelperId: interaction.user.id },
    ],
  });

  let user = await User.findOne({
    discordId: interaction.user.id,
  });

  if (!clan) {
    await interaction.reply({
      content: "Вы не состоите в клане или у вас нет прав на редактирование.",
      ephemeral: true,
    });
  }

  if (clan && user) {
    const result = await Clan.findByIdAndUpdate(
      clan?._id,
      { clanName: interaction.fields.getTextInputValue("editName") },
      {
        new: true,
      }
    );

    const res = await User.findByIdAndUpdate(
      user?._id,
      { userClan: interaction.fields.getTextInputValue("editName") },
      {
        new: true,
      }
    );

    await res.save().catch(console.error);
    await result.save().catch(console.error);

    await interaction.reply({
      content: "Ваше название клана изменено!",
      ephemeral: true,
    });
  }
};
