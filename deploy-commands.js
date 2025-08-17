require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const clientId = '';
const token = '';
const commands = [];

const commandsPath = path.join(__dirname, 'commands');

function getCommandFiles(dirPath) {
	const entries = fs.readdirSync(dirPath, { withFileTypes: true });

	return entries.flatMap(entry => {
		const fullPath = path.join(dirPath, entry.name);
		if (entry.isDirectory()) {
			return getCommandFiles(fullPath);
		} else if (entry.isFile() && entry.name.endsWith('.js')) {
			return [fullPath];
		}
		return [];
	});
}

const commandFiles = getCommandFiles(commandsPath);

for (const filePath of commandFiles) {
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`🔁 Refreshing ${commands.length} application (/) commands...`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`✅ Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(`❌ Failed to reload commands:\n`, error);
	}
})();
