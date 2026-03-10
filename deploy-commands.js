require("dotenv").config()

const { REST, Routes } = require("discord.js")
const fs = require("fs")
const path = require("path")

const commands = []

const foldersPath = path.join(__dirname, "commands")
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {

const commandsPath = path.join(foldersPath, folder)
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for (const file of commandFiles) {

try{

const filePath = path.join(commandsPath, file)
const command = require(filePath)

if(!command.data){
console.log(`⚠️ ${file} no tiene data`)
continue
}

commands.push(command.data.toJSON())

}catch(error){

console.log(`❌ ERROR EN COMANDO: ${file}`)
console.error(error)

}

}

}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)

;(async () => {

try {

console.log("🔄 Registrando comandos...")

await rest.put(
Routes.applicationGuildCommands(
process.env.CLIENT_ID,
process.env.GUILD_ID
),
{ body: commands }
)

console.log("✅ Comandos registrados correctamente")

} catch (error) {

console.error(error)

}

})()