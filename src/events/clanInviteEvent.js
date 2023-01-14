const inviteConfirm = require("../confirmation/inviteConfirm");
const Clan = require("../db/clanSchema");
const User = require("../db/userSchema.js");

module.exports = async (interaction, userValue) => {
  let clanCheck = await Clan.findOne({
    "clanInvitation.userId": userValue,
  });

  if (clanCheck) {
    return await interaction.reply({
      content: "У выбраннго человека уже есть приглашение в клан",
      ephemeral: true,
    });
  }

  let clan = await Clan.findOne({
    $and: [
      { clanOwnerId: interaction.user.id },
      {
        "clanBans.userId": { $ne: userValue },
      },
    ],
  });

  if (!clan) {
    return await interaction.reply({
      content:
        "Вы не являетесь лидером клана или выбранный человек забанен на вход",
      ephemeral: true,
    });
  }

  console.log("clan", clan);
  console.log("clanCheck", clanCheck);

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
