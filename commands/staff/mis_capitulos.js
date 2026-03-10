const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("mis_capitulos")
.setDescription("Ver tus capítulos"),

async execute(interaction){

let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))

let lista = capitulos.filter(c => c.usuario === interaction.user.id)

if(lista.length === 0){

return interaction.reply("No tienes capítulos asignados")

}

let texto = "📚 Tus capítulos:\n\n"

lista.forEach(c => {

texto += `${c.proyecto} - Capítulo ${c.numero}\n`

})

interaction.reply(texto)

}
}