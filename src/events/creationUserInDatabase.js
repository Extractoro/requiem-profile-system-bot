const User = require("../db/userSchema.js");
const mongoose = require("mongoose");

module.exports = async (author) => {
  let user = await User.findOne({ discordId: author.id });

  if (!user) {
    user = await new User({
      _id: mongoose.Types.ObjectId(),
      discordId: author.id,
      discordName: author.username,
      discordHashtag: author.discriminator,
      discordAvatar: author.avatar,
    });

    await user.save().catch(console.error);
  }

  if (user) {
    const result = await User.findByIdAndUpdate(
      user?._id,
      {
        discordId: author.id,
        discordName: author.username,
        discordHashtag: author.discriminator,
        discordAvatar: author.avatar,
      },
      {
        new: true,
      }
    );

    await result.save().catch(console.error);
  }
};
