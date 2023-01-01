const { SlashCommandBuilder } = require("discord.js");

// const clanEdit = new SlashCommandBuilder()
//   .setName("edit-clan")
//   .setDescription("Кастомизируйте свой клан.")
//   .addStringOption((option) =>
//     option
//       .setName("option")
//       .setDescription("Выберите, что вы хотите изменить")
//       .setRequired(true)
//       .setChoices(
//         { name: "name", value: "name" },
//         { name: "tag", value: "tag" },
//         { name: "status", value: "status" },
//         { name: "avatar", value: "avatar" },
//         { name: "background", value: "background" },
//         { name: "box", value: "box" },
//         { name: "leader", value: "leader" },
//         { name: "helper", value: "helper" },
//         { name: "privacy", value: "privacy" },
//         { name: "limit", value: "limit" }
//       )
//   );

// module.exports = clanEdit.toJSON();

const clanEdit = new SlashCommandBuilder()
  .setName("edit-clan")
  .setDescription("Кастомизируйте свой клан.")
  .addSubcommand((subcommand) =>
    subcommand
      .setName("name")
      .setDescription("Edit clan name")
      .addStringOption((option) =>
        option
          .setName("name")
          .setDescription("New clan name")
          .setRequired(true)
          .setMinLength(2)
          .setMaxLength(15)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("tag")
      .setDescription("Edit clan tag")
      .addStringOption((option) =>
        option
          .setName("tag")
          .setDescription("New clan tag")
          .setRequired(true)
          .setMinLength(2)
          .setMaxLength(5)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("status")
      .setDescription("Edit clan status")
      .addStringOption((option) =>
        option
          .setName("status")
          .setDescription("New clan status")
          .setRequired(true)
          .setMinLength(10)
          .setMaxLength(120)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("avatar")
      .setDescription("Edit clan avatar")
      .addAttachmentOption((option) =>
        option
          .setName("avatar")
          .setDescription("New clan avatar")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("background")
      .setDescription("Edit clan background")
      .addAttachmentOption((option) =>
        option
          .setName("background")
          .setDescription("New clan background")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("box")
      .setDescription("Edit clan box")
      .addStringOption((option) =>
        option
          .setName("box")
          .setDescription("New clan box. Пример: (#ffffff)")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("leader")
      .setDescription("Edit clan leader")
      .addUserOption((option) =>
        option
          .setName("leader")
          .setDescription("New clan leader")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("helper")
      .setDescription("Edit clan helper")
      .addUserOption((option) =>
        option
          .setName("helper")
          .setDescription("New clan helper")
          .setRequired(true)
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("privacy")
      .setDescription("Edit clan privacy")
      .addStringOption((opt) =>
        opt
          .setName("privacy")
          .setDescription("New clan privacy")
          .setRequired(true)
          .setChoices(
            { name: "open", value: "open" },
            { name: "close", value: "close" },
            { name: "request", value: "request" }
          )
      )
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName("limit")
      .setDescription("Edit clan limit")
      .addIntegerOption((option) =>
        option
          .setName("limit")
          .setDescription("New clan limit")
          .setRequired(true)
          .setMaxValue(50)
          .setMinValue(1)
      )
  );

module.exports = clanEdit.toJSON();
