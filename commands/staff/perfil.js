const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("perfil")
.setDescription("Ver tu perfil de trabajo"),

async execute(interaction){

const userId = interaction.user.id

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

if(!usuarios[userId]){

return interaction.reply({
content:"❌ No estás registrado en el sistema.",
ephemeral:true
})

}

const datos = usuarios[userId]

interaction.reply({

content:

`👤 **Tu perfil**

🌐 Traducciones: ${datos.traductor}
✏️ Ediciones: ${datos.editor}
🧹 Limpiezas: ${datos.limpieza}

📚 Total capítulos: ${datos.total}
⭐ Puntos: ${datos.puntos}`,

ephemeral:true

})

}

}