const { Schema, model } = require("mongoose");

const clanSchema = new Schema({
  _id: Schema.Types.ObjectId,
  clanOwner: { type: String },
  clanHelper: { type: String },
  clanMembers: { type: Number, default: 1 },
  clanMaxMembers: { type: Number, default: 50 },
  clanExp: { type: Number, default: 0 },
  clanPrivacy: { type: String, default: "open" },
});

module.exports = model("clan", clanSchema, "clans");
