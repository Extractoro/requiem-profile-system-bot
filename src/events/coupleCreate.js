const User = require("../db/userSchema.js");

module.exports = async (userCaller, userSelected) => {
  let user = await User.findOne({ discordId: userCaller.user.id });

  if (user) {
    const result = await User.findByIdAndUpdate(
      user?._id,
      {
        discordId: userCaller.user.id,
        discordName: userCaller.user.username,
        discordHashtag: userCaller.user.discriminator,
        discordAvatar: userCaller.user.avatar,
        userLike: `${userSelected.username}#${userSelected.discriminator}`,
      },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);

    await userCaller.reply({ content: "Профиль обновлен!", ephemeral: true });
  }
};
