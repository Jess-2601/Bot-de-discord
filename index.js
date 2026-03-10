require("dotenv").config()

const fs = require("fs")

const {
Client,
GatewayIntentBits,
Collection,
Events,
ChannelType
} = require("discord.js")

const client = new Client({
intents:[
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages
]
})

client.commands = new Collection()

const commandFiles = fs.readdirSync("./commands").filter(f=>f.endsWith(".js"))

for(const file of commandFiles){

const command = require(`./commands/${file}`)
client.commands.set(command.data.name,command)

}

client.once("clientReady",()=>{

console.log("✅ Bot conectado")

})

client.on(Events.InteractionCreate,async interaction=>{

if(interaction.isChatInputCommand()){

const command = client.commands.get(interaction.commandName)

if(!command) return

try{

await command.execute(interaction)

}catch(err){

console.log(err)

interaction.reply({
content:"❌ Error ejecutando comando",
ephemeral:true
})

}

}

if(interaction.isButton()){

const puesto = interaction.customId
const userId = interaction.user.id
const mensajeId = interaction.message.id

let trabajos = JSON.parse(fs.readFileSync("./data/trabajos.json"))
let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))

if(trabajos[userId]){

return interaction.reply({
content:"❌ Ya tienes un capítulo activo.",
ephemeral:true
})

}

if(!capitulos[mensajeId]) return

if(capitulos[mensajeId].puestos[puesto]){

return interaction.reply({
content:"❌ Ese puesto ya fue tomado.",
ephemeral:true
})

}

trabajos[userId] = mensajeId
capitulos[mensajeId].puestos[puesto] = userId

let canal

if(!capitulos[mensajeId].canal){

canal = await interaction.guild.channels.create({

name:`cap-${capitulos[mensajeId].numero}`,

type:ChannelType.GuildText,

permissionOverwrites:[

{
id:interaction.guild.roles.everyone,
deny:["ViewChannel"]
},

{
id:interaction.user.id,
allow:["ViewChannel","SendMessages"]
},

{
id:client.user.id,
allow:["ViewChannel","SendMessages"]
}

]

})

capitulos[mensajeId].canal = canal.id

}else{

canal = interaction.guild.channels.cache.get(capitulos[mensajeId].canal)

await canal.permissionOverwrites.edit(userId,{
ViewChannel:true,
SendMessages:true
})

}

fs.writeFileSync("./data/trabajos.json",JSON.stringify(trabajos,null,2))
fs.writeFileSync("./data/capitulos.json",JSON.stringify(capitulos,null,2))

canal.send(`👤 ${interaction.user} tomó el puesto **${puesto}**`)

interaction.reply({
content:`✅ Tomaste el puesto **${puesto}**`,
ephemeral:true
})

}

})

client.login(process.env.TOKEN)