const Clan = require("../../../db/clanSchema");
const mongoose = require("mongoose");
const User = require("../../../db/userSchema.js");

module.exports = async (interaction, clanName) => {
  let clan = await Clan.findOne({ clanOwnerId: interaction.user.id });

  let user = await User.findOne({
    $and: [{ userClan: "Отсутствует" }, { discordId: interaction.user.id }],
  });

  if (!user || clan) {
    await interaction.reply({
      content: "У тебя уже есть свой клан.",
      ephemeral: true,
    });
  }

  if (!clan && user) {
    clan = await new Clan({
      _id: mongoose.Types.ObjectId(),
      clanName,
      clanOwner: `${interaction.user.username}#${interaction.user.discriminator}`,
      clanOwnerId: interaction.user.id,
      clanMembers: [
        {
          memberId: interaction.user.id,
          memberName: interaction.user.username,
          memberDiscriminator: interaction.user.discriminator,
          memberExp: 0,
          memberRole: "owner",
        },
      ],
    });

    const result = await User.findByIdAndUpdate(
      user?._id,
      { userClan: clanName },
      {
        new: true,
      }
    );

    await clan.save().catch(console.error);
    await result.save().catch(console.error);

    await interaction.reply({
      content: "Клан успешно создан!",
      ephemeral: true,
    });
  }
};