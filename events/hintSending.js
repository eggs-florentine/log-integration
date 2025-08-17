let { Events, EmbedBuilder, ChannelType, PermissionsBitField, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { mongodbPW } = require('../config.json');
const uri =`"mongodb+srv://suggestions:${mongodbPW}@rose-vfms.k338rsp.mongodb.net/?retryWrites=true&w=majority&appName=rose-vfms"`;

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {        
        if (interaction.channel.name === 'command-log') {

            const message = interaction.message;
            const command = message.content.embeds[0].description.split('`')[1];
            const moderator = message.content.embeds[0].description.split(' ')[0].split(':')[0];
            if (command.startsWith(':log hint')) {
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

                const commandLog = await interaction.guild.channels.cache.find(c => c.name === 'command-log');
                const response = await commandLog.send(`In-game integration used by ${moderator} to send approved hint: ${hint} (${key})`);
                }

            }
        }
    }
