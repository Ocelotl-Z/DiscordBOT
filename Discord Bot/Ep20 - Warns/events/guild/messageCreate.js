require("dotenv").config();
const prefix = process.env.PREFIX;

//& MODELOS
const userModel = require("../../models/userSchema");
//& MODELOS

module.exports = async (client, discord, message) => {
  if (message.author.bot) return;

  //& REGISTRAR USUARIO
  try {
    let userData = await userModel.findOne({ userID: message.author.id });
    if (!userData) {
      let user = await userModel.create({
        userID: message.author.id,
        userName: message.author.username,
        logs: [
          {
            serverID: message.guild.id,
          },
        ],
      });
      user.save();
      console.log("Se ha registrado usuario");
    }
  } catch (error) {
    console.log(error);
  }
  //& REGISTRAR USUARIO

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command =
    client.commands.get(cmd) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(cmd));

  if (command) command.execute(client, message, args, discord);
  if (!command) return message.channel.send("Este comando no existe");
};
