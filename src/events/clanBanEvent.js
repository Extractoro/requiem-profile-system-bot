const Clan = require("../db/clanSchema");
const User = require("../db/userSchema.js");

module.exports = async (interaction, userValue) => {
  let clan = await Clan.findOne({ clanOwnerId: interaction.user.id });

  if (!clan) {
    return await interaction.reply({
      content: "Вы не являетесь лидером клана.",
      ephemeral: true,
    });
  }

  let user = await User.findOne({
    $and: [{ userClan: clan?.clanName }, { discordId: userValue }],
  });

  if (!user) {
    return await interaction.reply({
      content: "Выбраный пользователь не является членом вашего клана.",
      ephemeral: true,
    });
  }

  if (clan) {
    var newMembers = clan.clanMembers.filter(
      (item) => item.memberId !== user.discordId
    );

    var newMemberBan = {
      userName: user.discordName,
      userId: user.discordId,
    };
  }

  if (user && user.discordId === clan.clanOwnerId) {
    return await interaction.reply({
      content: `Вы не можете забанить себя.`,
      ephemeral: true,
    });
  }

  if (user && user.discordId === clan.clanHelperId) {
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
        clanBans: [...clan.clanBans, newMemberBan],
      },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);
    await res.save().catch(console.error);

    return await interaction.reply({
      content: `Вы забанили <@${user.discordId}>`,
      ephemeral: true,
    });
  }

  if (user) {
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
        clanBans: [...clan.clanBans, newMemberBan],
      },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);
    await res.save().catch(console.error);

    return await interaction.reply({
      content: `Вы забанили <@${user.discordId}>`,
      ephemeral: true,
    });
  }
};
