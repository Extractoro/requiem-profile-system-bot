const { Schema, model } = require("mongoose");

const clanSchema = new Schema({
  _id: Schema.Types.ObjectId,
  clanName: { type: String },
  clanTag: { type: String, default: "Отсутствует" },
  clanOwner: { type: String },
  clanOwnerId: { type: String },
  clanHelper: { type: String, default: "Отсутствует" },
  clanHelperId: { type: String, default: "Отсутствует" },
  clanMembers: { type: Array, default: [] },
  clanLimit: { type: Number, default: 50 },
  clanExp: { type: Number, default: 0 },
  clanPrivacy: { type: String, default: "open" },
  clanMemberRole: { type: String, default: "Отсутствует" },
  clanRequests: { type: Array, default: [] },
  clanBans: { type: Array, default: [] },
  clanBackground: {
    type: String,
    default: "https://www.colorhexa.com/161616.png",
  },
  clanAvatar: {
    type: String,
    default: "https://www.colorhexa.com/161616.png",
  },
  clanBox: {
    type: String,
    default: "#435",
  },
  clanStatus: { type: String, default: "Отсутствует" },
  clanBalance: { type: Number, default: 0 },
  clanEquipment: { type: Array, default: [] },
});

module.exports = model("clan", clanSchema, "clans");
