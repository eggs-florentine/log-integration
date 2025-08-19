let { Events, EmbedBuilder, ChannelType, PermissionsBitField, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');
const { apiKey } = require('./../config.json')
module.exports = {
    name: Events.MessageCreate,
    async execute(message) {        
        if (message.channel.name === 'command-log') {
            //
            let command;
            let moderator;
            try {
             command = message.embeds[0].data.description.split('`')[1];
             moderator = message.embeds[0].data.description.split(' ')[0].split(':')[0];
            } catch {
                
            }
            if (command && command.startsWith(':log warn')) {
                const logs = await message.guild.channels.cache.find(c => c.name === 'game-mod-log');
                const rawReason = command.split(' ')
                const target = rawReason[2];
                const reason = rawReason.splice(3, 100).join(' ');
                const apiresponse = await fetch('https://api.policeroleplay.community/v1/server/command', {
    method: 'POST',
    headers: {
      "server-key": apiKey,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "command": `:pm ${target} You have been warned by a server moderator: ${reason}`,
    })
});

    const embed = new EmbedBuilder()
        .setTitle('Player Warned')
        .setDescription(' ')
        .addFields(
            {name: 'Moderator', value: moderator}, 
            {name: 'Player', value: target}, 
            {name: 'Reason', value: reason}
        )
    
    logs.send({embeds: [embed]});

console.log(await apiresponse.json());

            }
        }
    }
}
