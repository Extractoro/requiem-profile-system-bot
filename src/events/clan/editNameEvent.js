const Clan = require("../../db/clanSchema");
const User = require("../../db/userSchema.js");

module.exports = async (interaction, clanValue) => {
  let clan = await Clan.findOne({
    $or: [
      { clanOwnerId: interaction.user.id },
      { clanHelperId: interaction.user.id },
    ],
  });

  let users = await User.find({
    userClan: clan.clanName,
  });

  if (!clan) {
    return await interaction.reply({
      content: "Вы не состоите в клане или у вас нет прав на редактирование.",
      ephemeral: true,
    });
  }

  if (clan) {
    const result = await Clan.findByIdAndUpdate(
      clan?._id,
      { clanName: clanValue },
      {
        new: true,
      }
    );

    for (let user of users) {
      const res = await User.findByIdAndUpdate(
        user?._id,
        { userClan: clanValue },
        {
          new: true,
        }
      );

      await res.save().catch(console.error);
    }
    await result.save().catch(console.error);

    return await interaction.reply({
      content: "Ваше название клана изменено!",
      ephemeral: true,
    });
  }
};
