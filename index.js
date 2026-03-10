require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// colección de comandos
client.commands = new Collection();

// leer carpeta commands
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// cuando el bot se conecta
client.once("ready", () => {
  console.log("✅ Bot conectado correctamente");
});

// escuchar interacciones (slash commands)
client.on("interactionCreate", async (interaction) => {

  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "❌ Hubo un error ejecutando este comando.",
      ephemeral: true
    });
  }

});

// iniciar bot
client.login(process.env.TOKEN);