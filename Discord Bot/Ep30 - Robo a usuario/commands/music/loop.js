const { loopQueue } = require("../../global/music");
module.exports = {
  name: "loop",
  description: "Loop a la lista de reproduccion",
  aliases: ["lp"],
  async execute(client, message, args, discord) {
    const loop = loopQueue(message.guild.id);

    if (loop == "SN") return message.channel.send("Sin cacniones");
    if (!loop) return message.reply("Loop descativado");
    if (loop) return message.reply("Loop activado");
  },
};
