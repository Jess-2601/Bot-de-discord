const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("bonus")
.setDescription("Agregar puntos a un usuario")
.addUserOption(option =>
option.setName("usuario").setRequired(true).setDescription("Usuario"))
.addIntegerOption(option =>
option.setName("cantidad").setRequired(true).setDescription("Cantidad")),

async execute(interaction){

const user = interaction.options.getUser("usuario")
const cantidad = interaction.options.getInteger("cantidad")

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

if(!usuarios[user.id]){
return interaction.reply("❌ Usuario no registrado")
}

usuarios[user.id].puntos += cantidad

fs.writeFileSync("./data/usuarios.json", JSON.stringify(usuarios,null,2))

interaction.reply(`✅ ${cantidad} puntos agregados a ${user.username}`)

}
}