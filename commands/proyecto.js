const {
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("agregar_proyecto")
      .setDescription("Publicar un nuevo proyecto")
  
      .addChannelOption(option =>
        option
          .setName("canal")
          .setDescription("Canal donde se publicará el proyecto")
          .addChannelTypes(ChannelType.GuildText)
          .setRequired(true)
      )
  
      .addStringOption(option =>
        option
          .setName("nombre")
          .setDescription("Nombre del proyecto")
          .setRequired(true)
      ),
  
    async execute(interaction) {
  
      const canal = interaction.options.getChannel("canal");
      const nombre = interaction.options.getString("nombre");
  
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
      );
  
      await canal.send({
        content:
  `📚 **${nombre}**
  
  Reclama tu puesto para trabajar en este capítulo.
  
  🌐 Traductor  
  ✏️ Editor  
  🧹 Limpieza`,
        components: [botones]
      });
  
      await interaction.reply({
        content: "✅ Proyecto publicado",
        ephemeral: true
      });
  
    },
  };