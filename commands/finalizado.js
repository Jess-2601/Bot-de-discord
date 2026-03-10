const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const database = require("../database.json");

module.exports = {

data:new SlashCommandBuilder()
.setName("finalizado")
.setDescription("Marcar trabajo terminado"),

async execute(interaction){

const usuarios = new Set(database.usuariosTrabajando);

if(!usuarios.has(interaction.user.id)){

return interaction.reply({
content:"❌ No estás trabajando en ningún capítulo",
ephemeral:true
});

}

usuarios.delete(interaction.user.id);

database.usuariosTrabajando=[...usuarios];

fs.writeFileSync("./database.json",JSON.stringify(database,null,2));

interaction.reply({
content:"✅ Ahora puedes tomar otro capítulo",
ephemeral:true
});

}

};