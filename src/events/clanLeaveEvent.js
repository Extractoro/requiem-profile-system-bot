const Clan = require("../db/clanSchema.js");
const User = require("../db/userSchema.js");

module.exports = async (interaction) => {
  let user = await User.findOne({
    discordId: interaction.user.id,
  });

  let clan = await Clan.findOne({
    clanName: user.userClan,
  });

  if (user && user.userClan === "Отсутствует") {
    return await interaction.reply({
      content: "У тебя нет клана.",
      ephemeral: true,
    });
  }

  if (clan) {
    var newMembers = clan.clanMembers.filter(
      (item) => item.memberId !== user.discordId
    );
  }

  if (
    user &&
    user.userClan !== "Отсутствует" &&
    user.discordId === clan.clanOwnerId
  ) {
    const result = await User.findByIdAndUpdate(
      user?._id,
      { userClan: "Отсутствует" },
      {
        new: true,
      }
    );

    const res = await Clan.findByIdAndUpdate(
      clan?._id,
      {
        clanOwner: clan.clanHelper,
        clanOwnerId: clan.clanHelperId,
        clanMembers: newMembers,
      },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);
    await res.save().catch(console.error);

    return await interaction.reply({
      content: `Вы покинули клан`,
      ephemeral: true,
    });
  }

  if (
    user &&
    user.userClan !== "Отсутствует" &&
    user.discordId === clan.clanHelperId
  ) {
    const result = await User.findByIdAndUpdate(
      user?._id,
      { userClan: "Отсутствует" },
      {
        new: true,
      }
    );

    const res = await Clan.findByIdAndUpdate(
      clan?._id,
      {
        clanHelper: "Отсутствует",
        clanHelperId: "Отсутствует",
        clanMembers: newMembers,
      },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);
    await res.save().catch(console.error);

    return await interaction.reply({
      content: `Вы покинули клан`,
      ephemeral: true,
    });
  }

  if (user && user.userClan !== "Отсутствует") {
    const result = await User.findByIdAndUpdate(
      user?._id,
      { userClan: "Отсутствует" },
      {
        new: true,
      }
    );

    const res = await Clan.findByIdAndUpdate(
      clan?._id,
      {
        clanMembers: newMembers,
      },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);
    await res.save().catch(console.error);

    return await interaction.reply({
      content: `Вы покинули клан`,
      ephemeral: true,
    });
  }
};
