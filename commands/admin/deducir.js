const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("deducir")
.setDescription("Quitar puntos a un usuario")

.addUserOption(option =>
option
.setName("usuario")
.setDescription("Usuario al que se le quitarán puntos")
.setRequired(true))

.addIntegerOption(option =>
option
.setName("cantidad")
.setDescription("Cantidad de puntos a quitar")
.setRequired(true)),

async execute(interaction){

const usuario = interaction.options.getUser("usuario")
const cantidad = interaction.options.getInteger("cantidad")

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

if(!usuarios[usuario.id]){
return interaction.reply("❌ Usuario no registrado")
}

usuarios[usuario.id].puntos -= cantidad

fs.writeFileSync("./data/usuarios.json", JSON.stringify(usuarios,null,2))

interaction.reply(`⚠️ ${cantidad} puntos descontados a ${usuario.username}`)

}

}