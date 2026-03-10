const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
 data: new SlashCommandBuilder()
  .setName("register")
  .setDescription("Registrar método de pago")
  .addStringOption(option =>
   option.setName("metodo")
    .setDescription("Método de pago")
    .setRequired(true)
  )
  .addStringOption(option =>
   option.setName("wallet")
    .setDescription("ID o wallet")
    .setRequired(true)
  ),

 async execute(interaction) {

  const metodo = interaction.options.getString("metodo");
  const wallet = interaction.options.getString("wallet");
  const userId = interaction.user.id;

  const data = JSON.parse(fs.readFileSync("./database/usuarios.json"));

  data[userId] = {
   metodo_pago: metodo,
   wallet: wallet,
   editing: 0,
   translation: 0,
   proofreading: 0,
   bonus: 0,
   deductions: 0,
   chapters: 0
  };

  fs.writeFileSync("./database/usuarios.json", JSON.stringify(data, null, 2));

  await interaction.reply("✅ Usuario registrado correctamente");

 }
};