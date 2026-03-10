const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {

data: new SlashCommandBuilder()
.setName("proyecto")
.setDescription("Crear proyecto")
.addStringOption(option =>
option.setName("nombre").setDescription("Nombre del proyecto").setRequired(true))
.addIntegerOption(option =>
option.setName("capitulos").setDescription("Cantidad de capítulos").setRequired(true)),

async execute(interaction){

const nombre = interaction.options.getString("nombre");
const caps = interaction.options.getInteger("capitulos");

const guild = interaction.guild;

await interaction.reply({
content:`📖 Creando proyecto **${nombre}**`,
ephemeral:true
});

const categoria = await guild.channels.create({
name:nombre,
type:ChannelType.GuildCategory
});

const canalCaps = await guild.channels.create({
name:"capitulos",
type:ChannelType.GuildText,
parent:categoria.id
});

for(let i=1;i<=caps;i++){

const mensaje = await canalCaps.send(

`📖 ${nombre} — Capítulo ${i}

📜 Traductor: Libre
✏ Editor: Libre
🧹 Limpieza: Libre

Estado: 🟢 Disponible
CATEGORIA:${categoria.id}`

);

await mensaje.react("📜");
await mensaje.react("✏️");
await mensaje.react("🧹");

}

}

};