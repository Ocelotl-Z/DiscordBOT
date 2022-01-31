const path = require("path");



module.exports = {
  name: "menu",
  aliases: ["mn", "img"],
  description: "Ejemplo de menu",
  async execute(client, message, args, discord) {
    //# MENU
    const menu = new discord.MessageSelectMenu()
      .setCustomId("menu1")
      .setPlaceholder("Selecciona un tema")
      .addOptions([
        { label: "Perros", description: "Imagen de perritos", value: "dog" },
        { label: "Gatos", description: "Imagen de gatitos", value: "cat" },
        { label: "Igunana", description: "Imagen de iguanas", value: "ing" },
      ]);
    //# MENU
    //& ROW
    const row = new discord.MessageActionRow().addComponents(menu);
    //& ROW

    //% BUTTONS
    const btn1 = new discord.MessageButton()
      .setCustomId("ejm")
      .setLabel("Btn1")
      .setEmoji("🆔")
      .setStyle("SUCCESS");
    const btn2 = new discord.MessageButton()
      .setCustomId("ejm2")
      .setLabel("Btn2")
      .setStyle("DANGER");
    //% BUTTONS

    //& FILA

    const fila = new discord.MessageActionRow().addComponents(btn1, btn2);

    //& FILA

    message.channel.send({
      content: "Hola soy un menu",
      components: [row, fila],
    });
  },
};
