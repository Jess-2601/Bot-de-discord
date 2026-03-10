require("dotenv").config()

const fs = require("fs")
const path = require("path")

const { Client, Collection, GatewayIntentBits } = require("discord.js")

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent,
GatewayIntentBits.GuildMessageReactions
]
})

client.commands = new Collection()

// Cargar carpetas de comandos
const foldersPath = path.join(__dirname, "commands")
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {

const commandsPath = path.join(foldersPath, folder)
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for (const file of commandFiles) {

const filePath = path.join(commandsPath, file)
const command = require(filePath)

if ("data" in command && "execute" in command) {

client.commands.set(command.data.name, command)

} else {

console.log(`[WARNING] El comando ${file} no tiene data o execute.`)

}

}

}

client.once("clientReady", () => {

console.log("✅ Bot conectado")

})

client.on("interactionCreate", async interaction => {

if (!interaction.isChatInputCommand()) return

const command = client.commands.get(interaction.commandName)

if (!command) return

try {

await command.execute(interaction)

} catch (error) {

console.error(error)

await interaction.reply({
content: "❌ Hubo un error ejecutando el comando",
ephemeral: true
})

}

})

client.login(process.env.TOKEN)