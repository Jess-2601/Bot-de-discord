const { SlashCommandBuilder } = require('discord.js');

module.exports = {
 data: new SlashCommandBuilder()
  .setName('setup')
  .setDescription('Configura el servidor del bot'),

 async execute(interaction) {
  await interaction.reply("✅ Servidor configurado correctamente");
 }
};