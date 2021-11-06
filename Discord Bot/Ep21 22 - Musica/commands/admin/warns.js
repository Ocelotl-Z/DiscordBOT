//# MODELOS
const userModel = require("../../models/userSchema");
//# MODELOS

const reporte = async (id, userName, msg, guildID) => {
  //% DB
  try {
    let userData = await userModel.findOne({ userID: id });
    if (!userData) {
      let user = await userModel.create({
        userID: id,
        userName: userName,
        logs: [
          {
            serverID: guildID,
            warn: [{ razon: msg }],
          },
        ],
      });
      user.save();
    } else {
      userModel
        .findOneAndUpdate(
          {
            userID: id,
            "logs.serverID": guildID,
          },
          {
            $push: { "logs.$.warn": { razon: msg } },
          }
        )
        .then((update) => {
          console.log("Actualizado Correctamente");
        })
        .catch((e) => {
          console.log("Erro Update: " + e);
        });
    }
  } catch (error) {
    console.log(error);
  }
  //% DB
};

const embedMessage = (nombre, msg) => {
  const embed = {
    author: {
      name: "WARNS",
      icon_url:
        "https://w7.pngwing.com/pngs/821/338/png-transparent-warning-sign-computer-icons-warning-icon-angle-triangle-warning-sign-thumbnail.png",
    },
    title: "WARNING",
    description: `Advertencia: ${nombre}\nPor: ` + msg,
    color: 16711680,
  };
  return embed;
};

module.exports = {
  name: "warns",
  description: "Advertecia a un usuario",
  aliases: ["wr"],
  roles: ["882094521196896327"],
  async execute(client, message, args, discord) {
    // !wr @mencion mensaje

    let us = message.guild.members.cache.find((u) => u.id == message.author.id);
    let perm = us.roles.cache.find((r) => r.id == this.roles);

    if (!perm) {
      return message.channel
        .send(`${message.author} No tienes permisos`)
        .then((m) => {
          setTimeout(() => {
            message.delete();
            m.delete();
          }, 3000);
        });
    }

    if (message.mentions.users.size < 1) {
      return message.channel
        .send(`${message.author} Tienes que mencionar a un usuario como minimo`)
        .then((m) => {
          setTimeout(() => {
            message.delete();
            m.delete();
          }, 3000);
        });
    }
    if (message.mentions.roles.size > 0) {
      return message.channel
        .send(`${message.author} Solo puedes mencionar a usuarios`)
        .then((m) => {
          setTimeout(() => {
            message.delete();
            m.delete();
          }, 3000);
        });
    }

    let bot = message.mentions.users.find((u) => u.bot === true);

    if (bot) {
      return message.channel
        .send(`${message.author} Solo puedes mencionar a usuarios`)
        .then((m) => {
          setTimeout(() => {
            message.delete();
            m.delete();
          }, 3000);
        });
    }

    let msg = args.slice(message.mentions.users.size, args.length).join(" ");

    if (!msg) {
      return message.channel
        .send(`${message.author} Necesitas poner una razon del warn`)
        .then((m) => {
          setTimeout(() => {
            message.delete();
            m.delete();
          }, 3000);
        });
    }

    let channel = message.guild.channels.cache.find(
      (c) => c.id == "893213236801974282"
    );

    message.mentions.users.forEach((user) => {
      reporte(user.id, user.username, msg, message.guild.id);
      let content = embedMessage(user.username, msg);
      user.send({ embeds: [content] });
      channel.send({ embeds: [content] });
    });
  },
};
