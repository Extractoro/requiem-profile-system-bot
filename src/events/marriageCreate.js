const Couple = require("../db/coupleSchema.js");
const mongoose = require("mongoose");
const marriageConfirm = require("../confirmation/marriageConfirm.js");

module.exports = async (userCaller, userSelected) => {
  let user = await Couple.findOne({ discordId: userCaller.user.id });

  if (!user) {
    user = await new Couple({
      _id: mongoose.Types.ObjectId(),
      discordFirstId: userCaller.user.id,
      discordFirstName: userCaller.user.username,
      discordFirstHashtag: userCaller.user.discriminator,
      discordFirstAvatar: userCaller.user.avatar,
      discordSecondId: userSelected.id,
      discordSecondName: userSelected.username,
      discordSecondHashtag: userSelected.discriminator,
      discordSecondAvatar: userSelected.avatar,
    });

    await user.save().catch(console.error);

    await marriageConfirm(userCaller);
  }
};
