const { Collection } = require("mongoose");

module.exports = {
  name: "perfil",
  aliases: [],
  description: "Registro de datos personalizados",
  async execute(client, message, args, discord) {
    message.channel.send("Ingresa los datos que se te piden").then((m) => {
      message.channel.send("Nombre");
    });

    // Canal personalizado
    // let channel = message.guild.channels.cache.find(
    //   (m) => m.id == "893213236801974282"
    // );

    let filter = (m) => m.author.id == message.author.id;

    let collector = new discord.MessageCollector(message.channel, {
      filter,
      max: 3,
    });

    let counter = 1;
    let datos = [];

    collector.on("collect", (msg) => {
      if (counter == 1) {
        datos.push(msg.content);
        msg.channel.send("Edad");
      } else if (counter == 2) {
        datos.push(msg.content);
        msg.channel.send("Descripcion");
      } else {
        datos.push(msg.content);
        msg.channel.send("Gracias");
      }
      counter++;
    });

    collector.on("end", (collected, reason) => {
      console.log(`Mensajes recoltados ${collected.size}`);
      console.log(`Razon del termino de coleccion: ${reason}`);
      console.log(datos);
    });
  },
};
