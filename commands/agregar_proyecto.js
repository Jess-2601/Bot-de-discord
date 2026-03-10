const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
    } = require("discord.js")
    
    module.exports={
    
    data:new SlashCommandBuilder()
    .setName("agregar_proyecto")
    .setDescription("Crear panel de trabajo"),
    
    async execute(interaction){
    
    const botones = new ActionRowBuilder().addComponents(
    
    new ButtonBuilder()
    .setCustomId("traductor")
    .setLabel("🌐 Traductor")
    .setStyle(ButtonStyle.Primary),
    
    new ButtonBuilder()
    .setCustomId("editor")
    .setLabel("✏️ Editor")
    .setStyle(ButtonStyle.Success),
    
    new ButtonBuilder()
    .setCustomId("limpieza")
    .setLabel("🧹 Limpieza")
    .setStyle(ButtonStyle.Secondary)
    
    )
    
    await interaction.channel.send({
    
    content:`📚 **Nuevo Capítulo Disponible**
    
    Reclama tu puesto:`,
    
    components:[botones]
    
    })
    
    interaction.reply({
    content:"✅ Panel creado",
    ephemeral:true
    })
    
    }
    
    }