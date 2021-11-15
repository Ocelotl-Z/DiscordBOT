module.exports = {
  name: "ping",
  description: "Tiempo de respuesta",
  async execute(client, message, args, discord) {
    message.channel.send("!PONG 😄");
  },
};
