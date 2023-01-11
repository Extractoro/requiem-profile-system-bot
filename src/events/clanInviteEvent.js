const Clan = require("../db/clanSchema");
const User = require("../db/userSchema.js");

module.exports = async (interaction, clanValue) => {
  let clan = await Clan.findOne({ clanOwnerId: interaction.user.id });

  let user = await User.findOne({
    $and: [{ userClan: clan?.clanName }, { discordId: clanValue }],
  });

  if (!user) {
    return await interaction.reply({
      content: "Выбраный пользователь не является членом вашего клана.",
      ephemeral: true,
    });
  }

  if (!clan) {
    return await interaction.reply({
      content: "Вы не являетесь лидером клана.",
      ephemeral: true,
    });
  }

  if (clan && user) {
    const res = await Clan.findByIdAndUpdate(
      clan?._id,
      {
        clanHelper: `${user.discordName}#${user.discordHashtag}`,
        clanHelperId: `${user.discordId}`,
      },
      {
        new: true,
      }
    );

    await res.save().catch(console.error);

    return await interaction.reply({
      content: "Ваш хелпер клана изменен!",
      ephemeral: true,
    });
  }
};
