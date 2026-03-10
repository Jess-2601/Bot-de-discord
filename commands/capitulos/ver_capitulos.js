const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("ver_capitulos")
.setDescription("Ver capítulos registrados"),

async execute(interaction){

let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))

if(capitulos.length === 0){

return interaction.reply("No hay capítulos registrados")

}

let texto = "📚 Capítulos\n\n"

capitulos.forEach(c => {

texto += `${c.proyecto} - Cap ${c.numero}\n`

})

interaction.reply(texto)

}
}