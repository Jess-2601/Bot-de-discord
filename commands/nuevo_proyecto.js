const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {

data: new SlashCommandBuilder()
.setName("nuevo_proyecto")
.setDescription("Crear nuevo proyecto")
.addStringOption(o =>
o.setName("nombre")
.setDescription("Nombre del proyecto")
.setRequired(true))
.addIntegerOption(o =>
o.setName("capitulos")
.setDescription("Cantidad de capítulos")
.setRequired(true)),

async execute(interaction){

const nombre = interaction.options.getString("nombre");
const capitulos = interaction.options.getInteger("capitulos");

for(let i = 1; i <= capitulos; i++){

const embed = new EmbedBuilder()
.setTitle(`📖 ${nombre}`)
.setDescription(`Capítulo ${i}`)
.addFields(
{name:"📜 Traductor", value:"Libre", inline:true},
{name:"✏ Editor", value:"Libre", inline:true},
{name:"🧹 Limpieza", value:"Libre", inline:true}
)
.setColor(0x00AEFF);

const mensaje = await interaction.channel.send({embeds:[embed]});

await mensaje.react("📜");
await mensaje.react("✏️");
await mensaje.react("🧹");

}

await interaction.reply({
content:"✅ Proyecto creado",
ephemeral:true
});

}

};