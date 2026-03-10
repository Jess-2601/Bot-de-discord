const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports={

data:new SlashCommandBuilder()
.setName("finalizado")
.setDescription("Finalizar capítulo"),

async execute(interaction){

const userId = interaction.user.id

let trabajos = JSON.parse(fs.readFileSync("./data/trabajos.json"))
let stats = JSON.parse(fs.readFileSync("./data/stats.json"))

if(!trabajos[userId]){

return interaction.reply({
content:"❌ No tienes capítulos activos",
ephemeral:true
})

}

delete trabajos[userId]

if(!stats[userId]) stats[userId]=0

stats[userId]++

fs.writeFileSync("./data/trabajos.json",JSON.stringify(trabajos,null,2))
fs.writeFileSync("./data/stats.json",JSON.stringify(stats,null,2))

interaction.reply({
content:`✅ Capítulo finalizado\nTotal: **${stats[userId]} capítulos**`,
ephemeral:true
})

}

}