const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("perfil")
.setDescription("Ver perfil de usuario")
.addUserOption(option =>
option.setName("usuario").setRequired(false)),

async execute(interaction){

const user = interaction.options.getUser("usuario") || interaction.user

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

if(!usuarios[user.id]){
return interaction.reply("Usuario no registrado")
}

const data = usuarios[user.id]

interaction.reply(

`👤 Perfil de ${user.username}

🌐 Traducciones: ${data.traductor}
✏️ Ediciones: ${data.editor}
🧹 Limpiezas: ${data.limpieza}

📚 Total capítulos: ${data.total}

⭐ Puntos: ${data.puntos}`

)

}
}