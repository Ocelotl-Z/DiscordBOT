const userSchema = require("../../models/userSchema");

module.exports = {
  name: "perfil",
  aliases: [],
  description: "Registro de datos personalizados",
  async execute(client, message, args, discord) {
    message.channel.send("Ingresa los datos que se te piden").then((m) => {
      message.channel.send("Nombre:");
    });

    let filter = (m) => m.author.id == message.author.id;

    let collector = new discord.MessageCollector(message.channel, {
      filter,
      max: 3,
    });

    let counter = 1;
    let datos = [];
    //& ["Ocelotl","100","Me gustan los perros"]
    collector.on("collect", (msg) => {
      if (counter == 1) {
        datos.push(msg.content);
        msg.channel.send("Edad:");
      } else if (counter == 2) {
        datos.push(msg.content);
        msg.channel.send("Descripcion:");
      } else {
        datos.push(msg.content);
        msg.channel.send("Gracias");
      }
      counter++;
    });

    collector.on("end", async (collected, reason) => {
      //# Guardar DATOS
      let update = await userSchema.findOneAndUpdate(
        { userID: message.author.id },
        { name: datos[0], age: datos[1], desc: datos[2] }
      );

      update.save();
      //#
    });
  },
};
