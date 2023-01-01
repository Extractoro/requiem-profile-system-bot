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

  if (!clan) {
    await interaction.reply({
      content: "Такого названия клана нет.",
      ephemeral: true,
    });
  }

  if (!user) {
    await interaction.reply({
      content: "Ты уже в клане.",
      ephemeral: true,
    });
  }

  if (user && clan) {
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

    await interaction.reply({
      content: `Вы присоединились к клану ${clanName}.`,
      ephemeral: true,
    });
  }
};
