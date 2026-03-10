const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("eliminar_proyecto")
.setDescription("Eliminar un proyecto")

.addStringOption(option =>
option
.setName("nombre")
.setDescription("Nombre del proyecto a eliminar")
.setRequired(true)),

async execute(interaction){

const nombre = interaction.options.getString("nombre")

let proyectos = JSON.parse(fs.readFileSync("./data/proyectos.json"))

if(!proyectos[nombre]){
return interaction.reply("❌ Proyecto no encontrado")
}

delete proyectos[nombre]

fs.writeFileSync("./data/proyectos.json", JSON.stringify(proyectos,null,2))

interaction.reply(`🗑 Proyecto **${nombre}** eliminado`)

}

}