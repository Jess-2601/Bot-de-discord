require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot activo");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Servidor web activo");
});

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("✅ Bot conectado correctamente");
});

client.on("interactionCreate", async interaction => {

  // COMANDOS
  if (interaction.isChatInputCommand()) {

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
    }

  }

  // BOTONES
  if (interaction.isButton()) {

    const puesto = interaction.customId;

    await interaction.reply({
      content: `✅ ${interaction.user} reclamó el puesto de **${puesto}**`,
      ephemeral: false
    });

  }

});

client.login(process.env.TOKEN);