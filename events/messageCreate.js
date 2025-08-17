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
                // TODO: MAKE REASON OBJECT
                const messages = await logs.messages.fetch({limit: 30}).then(messages => {
                    // messages.forEach(message => message.embeds[0].fields[0].value.startsWith(moderator))
                    const targetLog = messages.find(m => m.embeds[0].fields[0].value.startsWith(moderator));
                    const targetEmbed = targetLog.embeds[0];
                    let editMsg = new EmbedBuilder()
                        .setTitle(targetEmbed.title)
                        .setDescription(targetEmbed.description)
                        .addFields(targetEmbed.fields[0], targetEmbed.fields[1], {name: 'Reason', value: 'MAKE THE REASON VAR DONT FORGET ABOUT THIS FLORENCE'}})
                        .setFooter(targetEmbed.footer)
                    
                    const targetRow = targetEmbed.

                }

        }

}
