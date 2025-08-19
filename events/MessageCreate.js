let { Events, EmbedBuilder, ChannelType, PermissionsBitField, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { mongodbPW, apiKey } = require('../config.json');
const uri =`mongodb+srv://suggestions:${mongodbPW}@rose-vfms.k338rsp.mongodb.net/?retryWrites=true&w=majority&appName=rose-vfms`;
const {MongoClient, ServerApiVersion} = require('mongodb');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {        
                    console.log('Received message!')

        if (message.channel.name === 'command-log' && message.embeds[0] !== 'null' && message.author.id !== '894443342484606986') {
              console.log('Received message!')
            console.log(message);
            const command = message.embeds[0].data.description.split('`')[1];
            const moderator = message.embeds[0].data.description.split(' ')[0].split(':')[0];
            if (command.startsWith(':log hint')) {
              console.log('Received message!')
                const client = new MongoClient(uri, {
                    serverApi: {
                      version: ServerApiVersion.v1,
                      strict: true,
                      deprecationErrors: true,
                    }
                  });
                
                await client.connect();
                const db = client.db('suggestions-bot');
                const col = db.collection('suggestions');  
                  
                const key = command.split(' ')[2];
                const doc = await col.findOne({key: key}, null);
                if (!doc) return;
                const hint = doc.value;
                // TODO: integrate erlc api to send hint!
const apiresponse = await fetch('https://api.policeroleplay.community/v1/server/command', {
    method: 'POST',
    headers: {
      "server-key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "command": ":h " + hint,
    })
});

console.log(await apiresponse.json());


                const commandLog = await message.guild.channels.cache.find(c => c.name === 'command-log');
                const response = await commandLog.send(`In-game integration used by ${moderator} to send approved hint: ${hint} (${key})`);
                }

                if (command.startsWith(':log open')) {
                  console.log('Received open business hint!');
                              const command = message.embeds[0].data.description.split('`')[1];
            const moderator = message.embeds[0].data.description.split(' ')[0].split(':')[0];
const business = command.split(' ').splice(2,100).join(' ');
                  const apiresponse = await fetch('https://api.policeroleplay.community/v1/server/command', {
    method: 'POST',
    headers: {
      "server-key": "ABVwMcSVygfOeuvuPnPm-lEiZfvzZMEUaXRxLtOWzcYAJrGmSjsKKTYBWSCuq",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "command": ":h " + business + " is open!",
    })
});

console.log(await apiresponse.json());

                }

            }
        }
    }
