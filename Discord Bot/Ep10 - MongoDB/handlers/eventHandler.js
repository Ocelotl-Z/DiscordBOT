const fs = require("fs");

module.exports = (client, discord) => {
  console.log("---------------------- EVENTOS ----------------------");

  //* CODIGO

  fs.readdirSync("./events/").forEach((dir) => {
    const events = fs
      .readdirSync(`./events/${dir}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of events) {
      try {
        let evn = require(`../events/${dir}/${file}`);

        if (evn.event && typeof evn.event !== "string") {
          console.log(`Error: ${file}`);
          continue;
        }

        evn.event = evn.event || file.replace(".js", "");

        client.on(evn.event, evn.bind(null, client, discord));
        console.log(`Evento Cargado: ${evn.event}`);
      } catch (error) {
        console.log("Error en la carga de eventos");
        console.log(error);
      }
    }
  });

  //* CODIGO

  console.log("---------------------- EVENTOS ----------------------");
};
