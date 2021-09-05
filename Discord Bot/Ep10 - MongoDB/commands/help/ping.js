module.exports = {
  name: "ping",
  description: "Tiempo de respuesta",
  roles: ["admin", "coder"],
  async execute(client, message, args, discord) {
    message.channel.send("!PONG 😄");
  },
};
