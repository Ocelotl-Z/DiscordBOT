require("dotenv").config();
const prefix = process.env.PREFIX;
require("colors");

const msg = {
  content: "^suma 55 55",
};

if (msg.content.startsWith(prefix)) {
  const argumentos = msg.content.slice(prefix.length).split(/ +/);
  const comando = argumentos.shift().toLowerCase();

  console.log(`Argumentos: ${argumentos}`.cyan);
  console.log(`Comando: ${comando}`.red);

  if (comando == "ping") return console.log("pong".green);

  if (comando == "suma") {
    return console.log(
      `El resultado de la suma es: ${parseFloat(argumentos[0]) + parseFloat(argumentos[1])}  pesos`.green
    );
  }
}
