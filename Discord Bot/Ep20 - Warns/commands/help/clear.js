module.exports = {
  name: "clear",
  aliases: ["del", "borrar", "limpiar"],
  description: "Borra una cierta cantidad de mensajes",
  async execute(client, message, args, discord) {
    if (!args[0]) return message.reply("Ingresa numero de mensajes a borrar");
    if (isNaN(args[0])) return message.reply("Ingresa un numero");
    if (args[0] > 100) return message.reply("Debe ser un numero menor a 100");
    if (args[0] < 1) return message.reply("Debe ser un numero mayor a 0");

    await message.channel.messages
      .fetch({ limit: args[0] })
      .then((messages) => {
        message.channel.bulkDelete(messages);
      });
  },
};
