const Clan = require("../db/clanSchema.js");
const mongoose = require("mongoose");

module.exports = async (interaction, clanName) => {
  let clan = await Clan.findOne({ clanOwnerId: interaction.user.id });

  if (!clan) {
    clan = await new Clan({
      _id: mongoose.Types.ObjectId(),
      clanName,
      clanOwner: `${interaction.user.username}#${interaction.user.discriminator}`,
      clanOwnerId: interaction.user.id,
    });

    await clan.save().catch(console.error);
  }

  if (clan) {
    interaction.reply({
      content: "У тебя уже есть свой клан.",
      ephemeral: true,
    });
  }
};
