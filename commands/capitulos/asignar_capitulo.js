const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("asignar_capitulo")
.setDescription("Asignar usuario a un capítulo")

.addStringOption(option =>
option
.setName("proyecto")
.setDescription("Nombre del proyecto")
.setRequired(true))

.addIntegerOption(option =>
option
.setName("numero")
.setDescription("Número del capítulo")
.setRequired(true))

.addUserOption(option =>
option
.setName("usuario")
.setDescription("Usuario que trabajará en el capítulo")
.setRequired(true))

.addStringOption(option =>
option
.setName("rol")
.setDescription("Rol del usuario en el capítulo")
.setRequired(true)
.addChoices(
{ name: "Traductor", value: "traductor" },
{ name: "Editor", value: "editor" },
{ name: "Limpieza", value: "limpieza" }
)),

async execute(interaction){

const proyecto = interaction.options.getString("proyecto")
const numero = interaction.options.getInteger("numero")
const usuario = interaction.options.getUser("usuario")
const rol = interaction.options.getString("rol")

let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))

const capitulo = capitulos.find(c =>
c.proyecto === proyecto && c.numero === numero)

if(!capitulo){
return interaction.reply("❌ Capítulo no encontrado")
}

if(capitulo[rol]){
return interaction.reply("❌ Ese puesto ya está ocupado")
}

capitulo[rol] = usuario.id

fs.writeFileSync("./data/capitulos.json", JSON.stringify(capitulos,null,2))

interaction.reply(`✅ ${usuario.username} asignado como **${rol}** en capítulo ${numero}`)

}

}