const { Invite } = require("discord.js");
const inviteConfirm = require("../confirmation/inviteConfirm");
const Clan = require("../db/clanSchema");
const User = require("../db/userSchema.js");

module.exports = async (interaction, userValue) => {
  let clan = await Clan.findOne({
    $and: [
      { clanOwnerId: interaction.user.id },
      { $not: [{ clanInvitation: { $elemMatch: { userId: userValue } } }] },
      { $not: [{ clanBans: { $elemMatch: { userId: userValue } } }] },
    ],
  });
  console.log(clan);

  if (!clan) {
    return await interaction.reply({
      content: "Вы не являетесь лидером клана.",
      ephemeral: true,
    });
  }

  let user = await User.findOne({
    $and: [{ userClan: "Отсутствует" }, { discordId: userValue }],
  });

  if (!user) {
    return await interaction.reply({
      content: "У выбранного пользователя есть клан.",
      ephemeral: true,
    });
  }

  var newMemberInvitation = {
    userName: user.discordName,
    userDiscriminator: user.discordHashtag,
    userId: user.discordId,
  };

  if (clan && user) {
    const res = await Clan.findByIdAndUpdate(
      clan?._id,
      { clanInvitation: [...clanInvitation, newMemberInvitation] },
      {
        new: true,
      }
    );

    await res.save().catch(console.error);
    await inviteConfirm(interaction, userValue);
  }
};
