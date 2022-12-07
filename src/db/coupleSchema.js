const { Schema, model } = require("mongoose");

const coupleSchema = new Schema({
  _id: Schema.Types.ObjectId,
  discordFirstId: { type: String },
  discordFirstName: { type: String },
  discordFirstHashtag: { type: String },
  discordFirstAvatar: { type: String },
  discordSecondId: { type: String },
  discordSecondName: { type: String },
  discordSecondHashtag: { type: String },
  discordSecondAvatar: { type: String },
  coupleBackground: {
    type: String,
    default: "https://www.colorhexa.com/161616.png",
  },
  coupleStatus: { type: String, default: "Отсутствует" },
  coupleBalance: { type: Number, default: 0 },
  coupleEquipment: { type: Array, default: [] },
  coupleConfirm: { type: Boolean, default: false },
});

module.exports = model("couple", coupleSchema, "couples");
