const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("guardarcapi")
.setDescription("Guardar capítulo terminado")

.addChannelOption(option =>
option.setName("canal")
.setDescription("Canal del capítulo")
.setRequired(true))

.addStringOption(option =>
option.setName("tipo")
.setDescription("Tipo de trabajo")
.setRequired(true)
.addChoices(
{ name: "Traductor", value: "traductor"},
{ name: "Editor", value: "editor"},
{ name: "Limpieza", value: "limpieza"}
))

.addIntegerOption(option =>
option.setName("capitulo")
.setDescription("Número de capítulo")
.setRequired(true)),

async execute(interaction){

const user = interaction.user.id
const tipo = interaction.options.getString("tipo")

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

if(!usuarios[user]){

return interaction.reply({
content:"❌ Debes registrarte primero con /registrar",
ephemeral:true
})

}

usuarios[user][tipo]++
usuarios[user].total++

fs.writeFileSync("./data/usuarios.json", JSON.stringify(usuarios,null,2))

interaction.reply({

content:`✅ Capítulo guardado como **${tipo}**`,
ephemeral:true

})

}

}