const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("registro")
    .setDescription("Registrar tu información de pago")

    .addStringOption(option =>
      option
        .setName("correo")
        .setDescription("Tu correo electrónico")
        .setRequired(true)
    )

    .addStringOption(option =>
      option
        .setName("binance_id")
        .setDescription("Tu ID o correo de Binance")
        .setRequired(true)
    ),

  async execute(interaction) {

    const correo = interaction.options.getString("correo");
    const binance = interaction.options.getString("binance_id");

    await interaction.reply(
      `✅ Registro completado\n📧 Correo: ${correo}\n💰 Binance: ${binance}`
    );

  },
};