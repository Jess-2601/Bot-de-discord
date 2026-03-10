const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("chaptersave")
.setDescription("Guardar capítulo terminado")

.addChannelOption(option =>
option.setName("channel")
.setDescription("Canal del capítulo")
.setRequired(true))

.addStringOption(option =>
option.setName("type")
.setDescription("Tipo de trabajo")
.setRequired(true)
.addChoices(
{ name: "traductor", value: "traductor" },
{ name: "editor", value: "editor" },
{ name: "limpieza", value: "limpieza" }
))

.addIntegerOption(option =>
option.setName("chapter")
.setDescription("Número del capítulo")
.setRequired(true)),

async execute(interaction){

const user = interaction.user.id

const canal = interaction.options.getChannel("channel")
const type = interaction.options.getString("type")
const chapter = interaction.options.getInteger("chapter")

let usuarios = JSON.parse(fs.readFileSync("./database/usuarios.json"))

if(!usuarios[user]){

usuarios[user] = {

traductor:0,
editor:0,
limpieza:0,
total:0

}

}

usuarios[user][type]++
usuarios[user].total++

fs.writeFileSync("./database/usuarios.json", JSON.stringify(usuarios,null,2))

interaction.reply({

content:`✅ Capítulo ${chapter} guardado como **${type}**`,

ephemeral:true

})

}

}