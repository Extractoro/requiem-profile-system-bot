const Clan = require("../db/clanSchema");
const User = require("../db/userSchema.js");

module.exports = async (interaction) => {
  let clan = await Clan.findOne({
    clanOwnerId: interaction.user.id,
  });

  if (!clan) {
    return await interaction.reply({
      content: "Вы не состоите в клане или у вас нет прав на редактирование.",
      ephemeral: true,
    });
  }

  let users = await User.find({
    userClan: clan?.clanName,
  });

  if (clan) {
    for (let user of users) {
      const res = await User.findByIdAndUpdate(
        user?._id,
        { userClan: "Отсутствует" },
        {
          new: true,
        }
      );

      await res.save().catch(console.error);
    }

    await Clan.findByIdAndDelete(clan?._id);

    return await interaction.reply({
      content: "Ваш клан был удален!",
      ephemeral: true,
    });
  }
};
