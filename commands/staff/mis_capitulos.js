const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("mis_capitulos")
.setDescription("Ver capítulos en los que estás trabajando"),

async execute(interaction){

const userId = interaction.user.id

let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))

let lista = capitulos.filter(c =>
c.traductor === userId ||
c.editor === userId ||
c.limpieza === userId
)

if(lista.length === 0){

return interaction.reply({
content:"📭 No tienes capítulos asignados.",
ephemeral:true
})

}

let texto = "📚 **Tus capítulos:**\n\n"

lista.forEach(c => {

texto += `📖 ${c.proyecto} - Cap ${c.numero}\n`

})

interaction.reply({
content:texto,
ephemeral:true
})

}

}