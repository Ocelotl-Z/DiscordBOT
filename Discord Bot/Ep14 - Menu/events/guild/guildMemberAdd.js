//%PAQUETES
const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");
//%PAQUETES

//& MODELOS
const userModel = require("../../models/userSchema");
//& MODELOS

module.exports = async (client, discord, member) => {
  //& REGISTRAR USUARIO

  try {
    let user = await userModel.create({
      userID: member.id,
      userName: member.displayName,
      serverID: member.guild.id,
    });
    user.save();
  } catch (error) {
    console.log(error);
  }

  //& REGISTRAR USUARIO

  //%CANVAS
  const canvas = createCanvas(1200, 635); //Tamaño de nuestra imagen
  const ctx = canvas.getContext("2d");

  const background = await loadImage(join(__dirname, "../../img", "bg1.jpg")); //Imagen de fondo

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const name = member.displayName;

  if (name.length >= 16) {
    ctx.font = "bold 100px Sans";
    ctx.fillStyle = "#FF9B00";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 100);
  } else {
    ctx.font = "bold 130px Sans";
    ctx.fillStyle = "#FF9B00";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 100);
  }

  const server = "Bienvenido a: \n" + member.guild.name;

  ctx.font = "bold 75px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(server, canvas.width / 2, canvas.height / 2 - 100);

  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );

  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

  const imagen = new discord.MessageAttachment(canvas.toBuffer(), "img.png");

  //%CANVAS

  //& ROL
  const guild = member.guild;
  const rol = guild.roles.cache.find((role) => role.name === "coder");
  member.roles.add(rol);
  //& ROL

  const channel = member.guild.channels.cache.find(
    (channel) => channel.id === "881391003909648449"
  );

  const reglas = member.guild.channels.cache.find(
    (channel) => channel.id === "882381649919213568"
  );

  const me = new discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Bienvendia")
    .setDescription(`Lee las reglas en ${reglas}`)
    .setImage("attachment://img.png")
    .setTimestamp()
    .setFooter(member.guild.name);

  channel.send({ embeds: [me], files: [imagen] });
};
