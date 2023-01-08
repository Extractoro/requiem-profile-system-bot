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

  if (clan.clanPrivacy === "close") {
    return await interaction.reply({
      content: "Ваша приватность клана не подходит под этот метод.",
      ephemeral: true,
    });
  }

  for (let user of clan.clanRequests) {
    if (user.memberId === userValue) {
      let userF = await User.findOne({
        $and: [{ discordId: userValue }, { userClan: "Отсутствует" }],
      });

      if (userF) {
        const member = {
          memberId: userF.discordId,
          memberName: userF.discordName,
          memberDiscriminator: userF.discordHashtag,
          memberExp: 0,
        };

        const res = await User.findByIdAndUpdate(
          userF?._id,
          {
            userClan: clan.clanName,
          },
          {
            new: true,
          }
        );

        var newRequests = clan.clanRequests.filter(
          (item) => item.memberId !== userValue
        );

        const result = await Clan.findByIdAndUpdate(
          clan?._id,
          {
            clanMembers: [...clan.clanMembers, member],
            clanRequests: newRequests,
          },
          {
            new: true,
          }
        );

        await res.save().catch(console.error);
        await result.save().catch(console.error);

        return await interaction.reply({
          content: "Вы успешно приняли человека.",
          ephemeral: true,
        });
      } else {
        return await interaction.reply({
          content: "У этого человека есть клан.",
          ephemeral: true,
        });
      }
    }

    // if (user.memberId !== userValue) {
    //   return await interaction.reply({
    //     content: "Этот человек не отправлял заявку на вступление.",
    //     ephemeral: true,
    //   });
    // }
  }
};
