const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("balance")
.setDescription("Ver tus estadísticas"),

async execute(interaction){

const usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

const user = interaction.user.id

if(!usuarios[user]){

return interaction.reply("No tienes capítulos registrados.")

}

const data = usuarios[user]

interaction.reply(

`📊 **Tus estadísticas**

🌐 Traductor: ${data.traductor}
✏️ Editor: ${data.editor}
🧹 Limpieza: ${data.limpieza}

📚 Total capítulos: **${data.total}**`

)

}

}