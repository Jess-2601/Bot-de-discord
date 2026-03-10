const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("balanceusuario")
.setDescription("Ver balance de un miembro")

.addUserOption(option =>
option.setName("usuario")
.setDescription("Usuario")
.setRequired(true)),

async execute(interaction){

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

const user = interaction.options.getUser("usuario").id

if(!usuarios[user]){

return interaction.reply("❌ Usuario no registrado")

}

const data = usuarios[user]

interaction.reply(

`📊 **Balance de usuario**

Capítulos totales: ${data.total}
Puntos: ${data.puntos}`

)

}

}