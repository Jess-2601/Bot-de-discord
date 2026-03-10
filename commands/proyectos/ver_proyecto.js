const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("ver_proyecto")
.setDescription("Ver información de un proyecto")
.addStringOption(option =>
option.setName("nombre").setRequired(true)),

async execute(interaction){

const nombre = interaction.options.getString("nombre")

let proyectos = JSON.parse(fs.readFileSync("./data/proyectos.json"))

if(!proyectos[nombre]){

return interaction.reply("Proyecto no encontrado")

}

const p = proyectos[nombre]

interaction.reply(

`📚 ${nombre}

Capítulos: ${p.capitulos}

Estado: ${p.estado}`

)

}
}