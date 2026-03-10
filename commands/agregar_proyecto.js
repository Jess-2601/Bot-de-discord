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
      .setDescription("Agregar un nuevo proyecto")
  
      .addChannelOption(option =>
        option
          .setName("canal")
          .setDescription("Canal donde se publicará el proyecto")
          .addChannelTypes(ChannelType.GuildText) // SOLO canales de texto
          .setRequired(true)
      )
  
      .addNumberOption(option =>
        option
          .setName("precio_traductor")
          .setDescription("Pago para traductor")
          .setRequired(true)
      )
  
      .addNumberOption(option =>
        option
          .setName("precio_edicion")
          .setDescription("Pago para editor")
          .setRequired(true)
      )
  
      .addNumberOption(option =>
        option
          .setName("precio_limpieza")
          .setDescription("Pago para limpieza")
          .setRequired(true)
      ),
  
    async execute(interaction) {
  
      const canal = interaction.options.getChannel("canal");
      const traductor = interaction.options.getNumber("precio_traductor");
      const editor = interaction.options.getNumber("precio_edicion");
      const limpieza = interaction.options.getNumber("precio_limpieza");
  
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
  `📢 **Nuevo Proyecto Disponible**
  
  💰 **Pagos**
  
  🌐 Traductor: $${traductor}
  ✏️ Editor: $${editor}
  🧹 Limpieza: $${limpieza}
  
  Presiona un botón para reclamar tu puesto.`,
        components: [botones]
      });
  
      await interaction.reply({
        content: "✅ Proyecto creado correctamente",
        ephemeral: true
      });
  
    },
  };