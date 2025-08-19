let { Events, EmbedBuilder, ChannelType, PermissionsBitField, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {        

        if (interaction.isChatInputCommand()) {

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        if (!interaction.inGuild()) { 
            interaction.reply('Commands cannot be ran in DMs.')
            return;
        } 

        // rose-log error handling + command-log
        try {
            await command.execute(interaction);
            let options = [];
            for (const option of interaction.options.data) {
                options.push(option.name + ': ' + option.value);
            }

            const interactionUser = await interaction.guild.members.fetch(interaction.user.id)

        } catch (error) {
            console.error(`Error executing command ${interaction.commandName}:`, error);
        }
    }
        }
}
