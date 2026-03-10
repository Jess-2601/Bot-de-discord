const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports={

data:new SlashCommandBuilder()
.setName("leaderboard")
.setDescription("Ranking del staff"),

async execute(interaction){

let stats = JSON.parse(fs.readFileSync("./data/stats.json"))

let ranking = Object.entries(stats)

ranking.sort((a,b)=>b[1]-a[1])

let texto="🏆 **Leaderboard Staff**\n\n"

ranking.slice(0,10).forEach((u,i)=>{

texto+=`${i+1}. <@${u[0]}> — ${u[1]} capítulos\n`

})

interaction.reply(texto)

}

}