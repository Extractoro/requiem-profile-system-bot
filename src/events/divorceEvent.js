const Couple = require("../db/coupleSchema.js");
const divorceConfirm = require("../confirmation/divorceConfirm.js");

module.exports = async (interaction) => {
  let couple = await Couple.findOne({
    $or: [
      { discordFirstId: interaction.user.id },
      { discordSecondId: interaction.user.id },
    ],
  });

  if (couple === null) {
    await interaction.reply({
      content: "К сожалению, вас нет брака! Возможно, это и к счастью. :)",
      ephemeral: true,
    });
  }

  if (couple && couple.coupleConfirm === false) {
    await Couple.findByIdAndDelete(couple?._id);

    await interaction.reply({
      content: "Ваше предложение в браке отклонено.",
      ephemeral: true,
    });
  }

  if (couple && couple.coupleConfirm === true) {
    await divorceConfirm(interaction, couple);
  }
};
