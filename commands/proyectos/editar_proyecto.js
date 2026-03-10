const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("editar_proyecto")
.setDescription("Editar el estado de un proyecto")

.addStringOption(option =>
option
.setName("nombre")
.setDescription("Nombre del proyecto")
.setRequired(true))

.addStringOption(option =>
option
.setName("estado")
.setDescription("Nuevo estado del proyecto")
.setRequired(true)
.addChoices(
{ name: "Activo", value: "activo" },
{ name: "Pausado", value: "pausado" },
{ name: "Finalizado", value: "finalizado" }
)),

async execute(interaction){

const nombre = interaction.options.getString("nombre")
const estado = interaction.options.getString("estado")

let proyectos = JSON.parse(fs.readFileSync("./data/proyectos.json"))

if(!proyectos[nombre]){
return interaction.reply("❌ Proyecto no encontrado")
}

proyectos[nombre].estado = estado

fs.writeFileSync("./data/proyectos.json", JSON.stringify(proyectos,null,2))

interaction.reply(`✏️ Proyecto **${nombre}** actualizado a **${estado}**`)

}

}