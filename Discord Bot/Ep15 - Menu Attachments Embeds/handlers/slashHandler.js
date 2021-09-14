const fs = require("fs");
let slash = [];

module.exports = (client, discord) => {
  fs.readdirSync("./slashCommads/").forEach((dir) => {
    const commands = fs
      .readdirSync(`./slashCommads/${dir}/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commands) {
      try {
        let scmd = require(`../slashCommads/${dir}/${file}`);

        if (scmd.name) {
          client.slash.set(scmd.name, scmd);
          slash.push(scmd);
          console.log(`Comando: ${scmd.name}`);
        } else {
          console.log(`Error: ${file}`);
        }
      } catch (error) {
        console.log(`Error en el archivo: ${file}`);
      }
    }
  });

  client.on("ready", async () => {
    await client.application.commands.set(slash);
  });
};
