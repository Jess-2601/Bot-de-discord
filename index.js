require("dotenv").config();

const fs = require("fs");

const {
Client,
GatewayIntentBits,
Collection,
Events,
ChannelType
} = require("discord.js");

const client = new Client({
intents: [
GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent
]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

const command = require(`./commands/${file}`);
client.commands.set(command.data.name, command);

}

client.once("clientReady", () => {

console.log("✅ Bot conectado");

});

client.on(Events.InteractionCreate, async interaction => {

if (interaction.isChatInputCommand()) {

const command = client.commands.get(interaction.commandName);

if (!command) return;

try {

await command.execute(interaction);

} catch (error) {

console.error(error);

await interaction.reply({
content: "❌ Error ejecutando el comando",
ephemeral: true
});

}

}

if (interaction.isButton()) {

const userId = interaction.user.id;
const puesto = interaction.customId;

let trabajos = {};

if (fs.existsSync("./trabajos.json")) {
trabajos = JSON.parse(fs.readFileSync("./trabajos.json"));
}

if (trabajos[userId]) {

return interaction.reply({
content: "❌ Ya tienes un capítulo en proceso. Usa /finalizado cuando termines.",
ephemeral: true
});

}

trabajos[userId] = true;

fs.writeFileSync("./trabajos.json", JSON.stringify(trabajos, null, 2));

const canalNombre = `cap-${interaction.message.id}`;

let canal = interaction.guild.channels.cache.find(
c => c.name === canalNombre
);

if (!canal) {

canal = await interaction.guild.channels.create({
name: canalNombre,
type: ChannelType.GuildText,
permissionOverwrites: [
{
id: interaction.guild.roles.everyone,
deny: ["ViewChannel"]
},
{
id: interaction.user.id,
allow: ["ViewChannel", "SendMessages"]
},
{
id: client.user.id,
allow: ["ViewChannel", "SendMessages"]
}
]
});

}

await canal.permissionOverwrites.edit(interaction.user.id, {
ViewChannel: true,
SendMessages: true
});

await canal.send(
`📂 ${interaction.user} tomó el puesto **${puesto}**`
);

await interaction.reply({
content: `✅ Has tomado el puesto **${puesto}**`,
ephemeral: true
});

}

});

client.login(process.env.TOKEN);