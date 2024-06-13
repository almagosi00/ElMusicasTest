const { Client } = require("discord.js");
const client = new Client({intents:[3148800]});

client.config = require("./config.json");

client
    .login(client.config.token)
    .then(() => {
        console.log(`Cliente ${client.user.username} se ha iniciado`);
        client.user.setActivity(`DJ`);
    })
    .catch((error) => console.log(error));