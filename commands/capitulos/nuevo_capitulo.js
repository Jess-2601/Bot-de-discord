const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("nuevo_capitulo")
.setDescription("Crear un nuevo capítulo")
.addStringOption(option =>
option.setName("proyecto")
.setDescription("Nombre del proyecto")
.setRequired(true))
.addIntegerOption(option =>
option.setName("numero")
.setDescription("Número del capítulo")
.setRequired(true)),

async execute(interaction){

const proyecto = interaction.options.getString("proyecto")
const numero = interaction.options.getInteger("numero")

let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))

const existe = capitulos.find(c => 
c.proyecto === proyecto && c.numero === numero)

if(existe){
return interaction.reply("❌ Ese capítulo ya existe")
}

capitulos.push({

proyecto: proyecto,
numero: numero,

traductor: null,
editor: null,
limpieza: null,

estado: "pendiente"

})

fs.writeFileSync("./data/capitulos.json", JSON.stringify(capitulos,null,2))

interaction.reply(`✅ Capítulo ${numero} creado para **${proyecto}**`)

}

}