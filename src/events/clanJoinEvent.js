const Clan = require("../db/clanSchema.js");
const User = require("../db/userSchema.js");
const mongoose = require("mongoose");

module.exports = async (interaction, clanName) => {
  let user = await User.findOne({
    $and: [{ userClan: "Отсутствует" }, { discordId: interaction.user.id }],
  });

  let clan = await Clan.findOne({ clanName });

  // если лимит <, то нельзя зайти
  // тип приватности

  const member = {
    memberId: interaction.user.id,
    memberName: interaction.user.username,
    memberDiscriminator: interaction.user.discriminator,
    memberExp: 0,
  };

  const memberRequest = {
    memberId: interaction.user.id,
    memberName: interaction.user.username,
    memberDiscriminator: interaction.user.discriminator,
  };

  if (!clan) {
    return await interaction.reply({
      content: "Такого названия клана нет.",
      ephemeral: true,
    });
  }

  if (!user) {
    return await interaction.reply({
      content: "Ты уже в клане.",
      ephemeral: true,
    });
  }

  const userInBans = clan?.clanBans.find(
    (userBan) => userBan.userId === user.discordId
  );

  if (userInBans !== undefined) {
    return await interaction.reply({
      content: `К сожалению, вы забанены в этом клане.`,
      ephemeral: true,
    });
  }

  if (
    user &&
    clan &&
    clan.clanPrivacy === "open" &&
    clan.clanMembers.length < clan.clanLimit &&
    userInBans === undefined
  ) {
    const result = await User.findByIdAndUpdate(
      user?._id,
      { userClan: clanName },
      {
        new: true,
      }
    );

    const res = await Clan.findByIdAndUpdate(clan?._id, {
      clanMembers: [...clan.clanMembers, member],
    });

    await result.save().catch(console.error);
    await res.save().catch(console.error);

    return await interaction.reply({
      content: `Вы присоединились к клану ${clanName}.`,
      ephemeral: true,
    });
  }

  if (
    user &&
    clan &&
    clan.clanPrivacy === "request" &&
    clan.clanMembers.length < clan.clanLimit &&
    userInBans === undefined
  ) {
    for (let user of clan.clanRequests) {
      if (user.memberId === interaction.user.id) {
        return await interaction.reply({
          content: `<@${interaction.user.id}>, Вы уже отправили запрос в этот клан.`,
        });
      } else {
        const res = await Clan.findByIdAndUpdate(clan?._id, {
          clanRequests: [...clan.clanRequests, memberRequest],
        });

        await res.save().catch(console.error);

        return await interaction.reply({
          content: `Вы отправили заявку на вступление. Дождитесь, пока вас примут.`,
          ephemeral: true,
        });
      }
    }
  }

  if (user && clan && clan.clanPrivacy === "close") {
    return await interaction.reply({
      content: "Этот клан закрыл для новых игроков.",
      ephemeral: true,
    });
  }
};
