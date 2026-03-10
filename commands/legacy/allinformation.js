const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("allinformation")
.setDescription("Ver estadísticas completas del staff"),

async execute(interaction){

let usuarios = JSON.parse(fs.readFileSync("./database/usuarios.json"))

let ranking = Object.entries(usuarios)

ranking.sort((a,b)=> b[1].total - a[1].total)

let texto = "🏆 **Ranking del Staff**\n\n"

ranking.slice(0,10).forEach((u,i)=>{

texto += `${i+1}. <@${u[0]}> — ${u[1].total} capítulos\n`

})

interaction.reply(texto)

}

}