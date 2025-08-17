const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ThreadAutoArchiveDuration, RoleSelectMenuBuilder, PermissionsBitField, ActionRowBuilder, ActionRow, ComponentType } = require('discord.js');
const fs = require('fs').promises;
const { mongodbPW } = require('../config.json');
const uri =`"mongodb+srv://suggestions:${mongodbPW}@rose-vfms.k338rsp.mongodb.net/?retryWrites=true&w=majority&appName=rose-vfms"`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register-message')
        .setDescription('Register an approved message')
        .addStringOption(option => option.setName('msg').setDescription('The message to add to the index').setRequired(true))
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
        await col.insertOne({key: interaction.options.getString("key"), value: interaction.options.getString('msg')}).then(() => {
            interaction.editReply({ephemeral: true, content: `✅ **@${interaction.member.displayName},** approved message successfully registered to the database.`})
        })
    }
}