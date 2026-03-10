const { SlashCommandBuilder } = require("discord.js")
const fs = require("fs")

module.exports = {

data: new SlashCommandBuilder()
.setName("registrar")
.setDescription("Registrarte en el sistema")
.addStringOption(option =>
option.setName("email").setRequired(true))
.addStringOption(option =>
option.setName("metodo_pago").setRequired(true)),

async execute(interaction){

const email = interaction.options.getString("email")
const pago = interaction.options.getString("metodo_pago")

let usuarios = JSON.parse(fs.readFileSync("./data/usuarios.json"))

usuarios[interaction.user.id] = {

email: email,
metodo_pago: pago,

traductor: 0,
editor: 0,
limpieza: 0,

total: 0,
puntos: 0

}

fs.writeFileSync("./data/usuarios.json", JSON.stringify(usuarios,null,2))

interaction.reply("✅ Registro completado")

}
}