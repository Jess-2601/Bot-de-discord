const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
data: new SlashCommandBuilder()
.setName("finalizado")
.setDescription("Marcar capítulo como finalizado"),

async execute(interaction){

const userId = interaction.user.id;

let trabajos = {};
let stats = {};

if(fs.existsSync("./trabajos.json")){
trabajos = JSON.parse(fs.readFileSync("./trabajos.json"));
}

if(!trabajos[userId]){
return interaction.reply({
content:"❌ No tienes ningún capítulo activo.",
ephemeral:true
});
}

delete trabajos[userId];

fs.writeFileSync("./trabajos.json", JSON.stringify(trabajos,null,2));

if(fs.existsSync("./stats.json")){
stats = JSON.parse(fs.readFileSync("./stats.json"));
}

if(!stats[userId]){
stats[userId] = 0;
}

stats[userId]++;

fs.writeFileSync("./stats.json", JSON.stringify(stats,null,2));

await interaction.reply({
content:`✅ Capítulo finalizado.\n\nTotal de capítulos hechos: **${stats[userId]}**`,
ephemeral:true
});

}
};