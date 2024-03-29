const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    discordId: { type: String },
    discordName: { type: String },
    discordHashtag: { type: String },
    discordAvatar: { type: String },
    userBackground: {
      type: String,
      default: "https://www.colorhexa.com/161616.png",
    },
    userBox: { type: String, default: "#435" },
    userStatus: { type: String, default: "Отсутствует" },
    userMarriage: { type: String, default: "Отсутствует" },
    userMarriageWith: { type: String, default: "Отсутствует" },
    userLike: { type: String, default: "Отсутствует" },
    userClan: { type: String, default: "Отсутствует" },
    userBalance: { type: Number, default: 0 },
    userChatPoints: { type: Number, default: 0 },
    userVoicePoints: { type: Number, default: 0 },
    userVoiceTime: { type: Number, default: 0 },
    userEquipment: { type: Array, default: [] },
  },
  { strict: true }
);

module.exports = model("user", userSchema, "users");
