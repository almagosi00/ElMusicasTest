const { Client } = require("discord.js");
const client = new Client({intents:[3148800]});

const fs = require('nodo:fs');
const path = require('node:path');
const { Collection, Event } = require("discord.js")

client.config = require("./config.json");

client
    .login(client.config.token)
    .then(() => {
        console.log(`Cliente ${client.user.username} se ha iniciado`);
        client.user.setActivity(`DJ`);
    })
    .catch((error) => console.log(error));


client.commands = new Collection();

console.log(`DirName --> ${__dirname}`);
const foldersPath = path.join(__dirname,'commands');
const commandFolders = fs.readdirSync(foldersPath);

for(const folder of commandFolders){
    const commandsPath = path.join(foldersPath,folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for( const file of commandFiles){
        const filePath = path.join(commandsPath,file);
        const command = require(filePath);
        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command);
        }
        else{
            console.log(`[WARNING] El comando en ${filePath} depende de la propiedad "data" o "execute`);
        }
    }
}