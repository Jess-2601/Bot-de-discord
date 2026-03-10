const { SlashCommandBuilder } = require("discord.js")

module.exports = {

data: new SlashCommandBuilder()
.setName("ping")
.setDescription("Latencia del bot"),

async execute(interaction){

interaction.reply(`🏓 Pong ${interaction.client.ws.ping}ms`)

}
}