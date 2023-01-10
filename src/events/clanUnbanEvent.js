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
    discordId: userValue,
  });

  if (!user) {
    return await interaction.reply({
      content: "Выбраный пользователь не был найден.",
      ephemeral: true,
    });
  }

  if (clan) {
    var newMembersBans = clan.clanBans.filter(
      (item) => item.userId !== user?.discordId
    );

    var newMembersBansCheck = clan.clanBans.find(
      (item) => item.userId === user?.discordId
    );
  }

  if (newMembersBansCheck === undefined) {
    return await interaction.reply({
      content: "Этот пользователь не заблокирован в клане.",
      ephemeral: true,
    });
  }

  if (user) {
    const res = await Clan.findByIdAndUpdate(
      clan?._id,
      {
        clanBans: newMembersBans,
      },
      {
        new: true,
      }
    );

    await res.save().catch(console.error);

    return await interaction.reply({
      content: `Вы разблокировали <@${user.discordId}>`,
      ephemeral: true,
    });
  }
};
