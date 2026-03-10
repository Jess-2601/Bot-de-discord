const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports={

data:new SlashCommandBuilder()
.setName("stats")
.setDescription("Ver capítulos hechos"),

async execute(interaction){

let stats = JSON.parse(fs.readFileSync("./data/stats.json"))

const caps = stats[interaction.user.id] || 0

interaction.reply(`📊 Has hecho **${caps} capítulos**`)

}

}