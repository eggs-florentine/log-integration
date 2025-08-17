const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ThreadAutoArchiveDuration, RoleSelectMenuBuilder, PermissionsBitField, ActionRowBuilder, ActionRow, ComponentType } = require('discord.js');
const fs = require('fs').promises;
const { mongodbPW } = require('../config.json');
const uri =`"mongodb+srv://suggestions:${mongodbPW}@rose-vfms.k338rsp.mongodb.net/?retryWrites=true&w=majority&appName=rose-vfms"`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deregister-message')
        .setDescription('Deregister an approved message')
        .addStringOption(option => option.setName('key').setDescription('The key for the message e.g gta-drive, etc').setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();

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
        await col.deleteOne({key: interaction.options.getString('key')}).then(() => {
            interaction.editReply({ephemeral: true, content: `✅ **@${interaction.member.displayName},** approved message successfully deregistered from the database.`})
        })
    }
}