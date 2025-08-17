let { Events, EmbedBuilder, ChannelType, PermissionsBitField, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {        
        if (interaction.channel.name === 'command-log') {
            const message = interaction.message;
            const command = message.content.embeds[0].description.split('`')[1];
            const moderator = message.content.embeds[0].description.split(' ')[0].split(':')[0];
            if (command.startsWith(':log latest')) {
                const logs = await interaction.guild.channels.cache.find(c => c.name === 'game-mod-log');
                const rawReason = command.split(' ')
                // ok, so we start with :log latest blah blah blah
                // and it turns into [:log, latest, blah, blah, blah]
                // i need to get everything past the second element, so [2+]
                // can i remove the original items and do a .join()? 
                const reason = rawReason.splice(0, 2).join(' ');
                // yay!
                const messages = await logs.messages.fetch({limit: 30}).then(messages => {
                    const targetLog = messages.find(m => m.embeds[0].fields[0].value.startsWith(moderator));
                    const targetEmbed = targetLog.embeds[0];
                    let editMsg = new EmbedBuilder()
                        .setTitle(targetEmbed.title)
                        .setDescription(targetEmbed.description)
                        .addFields(targetEmbed.fields[0], targetEmbed.fields[1], {name: 'Reason', value: reason})
                        .setFooter({text: 'Reason edited in-game by ' + moderator})
                    
                    const targetRow = targetLog.components[0];
                    message.edit({content: '', embeds: [editMsg], components: [targetRow]});

                }

            )}
        }
    }
}
