const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("eliminar_capitulo")
.setDescription("Eliminar capítulo")

.addStringOption(option =>
option.setName("proyecto")
.setDescription("Proyecto")
.setRequired(true))

.addIntegerOption(option =>
option.setName("numero")
.setDescription("Capítulo")
.setRequired(true)),

async execute(interaction){

const proyecto = interaction.options.getString("proyecto")
const numero = interaction.options.getInteger("numero")

let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))

const nuevo = capitulos.filter(c =>
!(c.proyecto === proyecto && c.numero === numero)
)

if(nuevo.length === capitulos.length){

return interaction.reply("❌ Capítulo no encontrado")

}

fs.writeFileSync("./data/capitulos.json", JSON.stringify(nuevo,null,2))

interaction.reply(`🗑 Capítulo ${numero} eliminado`)

}

}