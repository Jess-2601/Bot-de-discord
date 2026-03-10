const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("perfil")
    .setDescription("Muestra tu perfil"),

  async execute(interaction) {

    const perfil = new EmbedBuilder()
      .setTitle("📊 Perfil de Usuario")
      .setColor("#00ffc3")

      .addFields(
        { name: "💳 Método de Pago", value: "Binance: 00000000" },
        { name: "📈 Ganancias del Mes", value: "$4.50" },
        { name: "✏️ Editing", value: "$0.00" },
        { name: "🌍 Translation", value: "$0.00" },
        { name: "📝 Proofreading", value: "$0.00" },
        { name: "🎁 Bonos del Mes", value: "$0.00" },
        { name: "💸 Deducciones", value: "$0.00" },
        { name: "💰 Ganancia Neta", value: "$0.00" },
        { name: "📚 Capítulos Totales", value: "0" },
        { name: "💵 Ganancia Total", value: "$0.00" }
      )

      .setFooter({ text: "Perfil generado automáticamente" });

    await interaction.reply({ embeds: [perfil] });

  }
};