const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("mischapters")
.setDescription("Ver tus capítulos trabajados"),

async execute(interaction){

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

const user = interaction.user.id

if(!usuarios[user]){

return interaction.reply("❌ No estás registrado")

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