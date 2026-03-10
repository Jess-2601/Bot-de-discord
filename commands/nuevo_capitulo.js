const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
    } = require("discord.js")
    
    const fs = require("fs")
    
    module.exports={
    
    data:new SlashCommandBuilder()
    .setName("nuevo_capitulo")
    .setDescription("Publicar nuevo capítulo")
    .addStringOption(o=>o.setName("proyecto").setDescription("Nombre del proyecto").setRequired(true)),
    
    async execute(interaction){
    
    const proyecto = interaction.options.getString("proyecto")
    
    let proyectos = JSON.parse(fs.readFileSync("./data/proyectos.json"))
    let capitulos = JSON.parse(fs.readFileSync("./data/capitulos.json"))
    
    if(!proyectos[proyecto]){
    
    return interaction.reply("❌ Proyecto no existe")
    
    }
    
    const numero = proyectos[proyecto].capitulo
    
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
    
    const mensaje = await interaction.channel.send({
    
    content:`📚 **${proyecto} — Capítulo ${numero}**
    
    Reclama tu puesto:`,
    
    components:[botones]
    
    })
    
    capitulos[mensaje.id] = {
    numero:numero,
    puestos:{},
    canal:null
    }
    
    proyectos[proyecto].capitulo++
    
    fs.writeFileSync("./data/proyectos.json",JSON.stringify(proyectos,null,2))
    fs.writeFileSync("./data/capitulos.json",JSON.stringify(capitulos,null,2))
    
    interaction.reply({
    content:"✅ Capítulo publicado",
    ephemeral:true
    })
    
    }
    
    }