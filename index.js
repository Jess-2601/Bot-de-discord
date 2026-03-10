require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const database = require("./database.json");

const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.GuildMessageReactions,
GatewayIntentBits.MessageContent
]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for(const file of commandFiles){

const command = require(`./commands/${file}`);
client.commands.set(command.data.name,command);

}

const usuariosTrabajando = new Set(database.usuariosTrabajando);
const datosCapitulos = database.capitulos;

function guardarDB(){

fs.writeFileSync("./database.json",
JSON.stringify({
usuariosTrabajando:[...usuariosTrabajando],
capitulos:datosCapitulos
},null,2));

}

client.once("ready",()=>{

console.log("✅ Bot conectado");

});

client.on("interactionCreate", async interaction => {

if(!interaction.isChatInputCommand()) return;

const command = client.commands.get(interaction.commandName);

if(!command) return;

await command.execute(interaction);

});

client.on("messageReactionAdd", async (reaction,user)=>{

if(user.bot) return;

const mensaje = reaction.message;

if(!mensaje.content.includes("Capítulo")) return;

if(usuariosTrabajando.has(user.id)){

reaction.users.remove(user.id);

return user.send("❌ Ya estás trabajando en otro capítulo");

}

let rol;

if(reaction.emoji.name==="📜") rol="Traductor";
if(reaction.emoji.name==="✏️") rol="Editor";
if(reaction.emoji.name==="🧹") rol="Limpieza";

if(!rol) return;

let datos = datosCapitulos[mensaje.id];

if(!datos){

datos={
Traductor:null,
Editor:null,
Limpieza:null,
canal:null
};

datosCapitulos[mensaje.id]=datos;

}

if(datos[rol]){

reaction.users.remove(user.id);

return user.send("❌ Ese puesto ya está ocupado");

}

datos[rol]=user.id;

usuariosTrabajando.add(user.id);

guardarDB();

let contenido = mensaje.content;

contenido = contenido.replace(`${rol}: Libre`,`${rol}: <@${user.id}>`);

if(!contenido.includes("🟡")){

contenido = contenido.replace("🟢 Disponible","🟡 En progreso");

}

await mensaje.edit(contenido);

let canal;

if(!datos.canal){

const linea = mensaje.content.split("\n").find(l => l.includes("CATEGORIA:"));
const categoriaID = linea.split(":")[1];

canal = await mensaje.guild.channels.create({
name:`capitulo-${mensaje.id}`,
parent:categoriaID
});

datos.canal=canal.id;

guardarDB();

}else{

canal = mensaje.guild.channels.cache.get(datos.canal);

}

await canal.permissionOverwrites.create(user.id,{
ViewChannel:true,
SendMessages:true
});

if(datos.Traductor && datos.Editor && datos.Limpieza){

let nuevo = contenido.replace("🟡 En progreso","🔴 Completo");

await mensaje.edit(nuevo);

}

});

client.login(process.env.TOKEN);