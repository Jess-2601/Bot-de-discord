const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports={

data:new SlashCommandBuilder()
.setName("stats")
.setDescription("Ver capítulos hechos"),

async execute(interaction){

let stats = JSON.parse(fs.readFileSync("./data/stats.json"))

const userId = interaction.user.id

const caps = stats[userId] || 0

interaction.reply({
content:`📊 Has hecho **${caps} capítulos**`,
ephemeral:true
})

}

}