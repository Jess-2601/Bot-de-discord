const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports={

data:new SlashCommandBuilder()
.setName("crear_proyecto")
.setDescription("Crear nuevo proyecto")
.addStringOption(o=>o.setName("nombre").setDescription("Nombre del proyecto").setRequired(true)),

async execute(interaction){

const nombre = interaction.options.getString("nombre")

let proyectos = JSON.parse(fs.readFileSync("./data/proyectos.json"))

proyectos[nombre] = {
capitulo:1
}

fs.writeFileSync("./data/proyectos.json",JSON.stringify(proyectos,null,2))

interaction.reply(`✅ Proyecto **${nombre}** creado`)

}

}