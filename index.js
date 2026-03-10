require("dotenv").config();

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot activo");
});

app.listen(3000, () => {
  console.log("🌐 Servidor web activo en puerto 3000");
});

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

// cargar comandos automáticamente
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// cuando el bot se conecta
client.once("ready", () => {
  console.log("✅ Bot conectado correctamente");
});

// escuchar comandos
client.on("interactionCreate", async interaction => {

  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "❌ Hubo un error ejecutando este comando.",
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: "❌ Hubo un error ejecutando este comando.",
        ephemeral: true
      });
    }
  }

});

// iniciar bot
client.login(process.env.TOKEN);