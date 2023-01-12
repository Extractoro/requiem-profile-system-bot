const Couple = require("../db/coupleSchema.js");
const mongoose = require("mongoose");
const marriageConfirm = require("../confirmation/marriageConfirm.js");

module.exports = async (userCaller, userSelected) => {
  let user = await Couple.findOne({
    $or: [
      { discordFirstId: userCaller.user.id },
      { discordSecondId: userSelected.id },
    ],
  });

  // Нельзя отправить самому себе

  if (user && user.coupleConfirm === true) {
    return await userCaller.reply({
      content: "Дружище, ты уже в браке.",
      ephemeral: true,
    });
  }

  if (user && user.coupleConfirm === false) {
    return await userCaller.reply({
      content:
        "Твое предложение еще не принято, дождись ответа от своего партнера. Если он(-а) не отвечает долгое время, то пропиши команду /divorce.\n\n❗ Если ты не в браке, то значит тому кому ты делаешь предложение уже занят!",
      ephemeral: true,
    });
  }

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

    await marriageConfirm(userCaller, userSelected);
  }
};
