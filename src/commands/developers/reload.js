const fs = require('fs')
const { promises: { readdir } } = require('fs')

module.exports = {
	name: 'reload',
	description: 'Reload a command.',
	usage: '[command]',

	permissions: [],
	developerOnly: true,

	options: [
		{ name: 'command', description: 'Command to reload.', type: 'STRING', required: true },
	],

	error: false,
	execute: async ({ interaction }) => {

		const client = interaction.client;
		const command = interaction.options.getString('command');

		const directories = await readdir(`${__dirname}/../`, { withFileTypes: true })
			.then(directories => directories.filter(directory => directory.isDirectory()))
			.then(directories => directories.map(directory => directory.name));
		
		for (directory of directories) {

			if (fs.existsSync(`${__dirname}/../${directory}/${command}.js`)) {
				
				delete require.cache[require.resolve(`${__dirname}/../${directory}/${command}.js`)];
				client.commands.delete(command);
		
				try {
					const data = require(`${__dirname}/../${directory}/${command}.js`);
					client.commands.set(data.name, data);
	
					interaction.followUp({ content: `Command \`${data.name}\` reloaded successfully.`, ephemeral: true });
					return;
				}
				catch (error) {
					interaction.followUp({ content: `Command \`${command}\` reload failed with error \`${error}\`. Full error logged to console.`, ephemeral: true });
					console.error(error);
					return;
				}
			}		
		}

		interaction.followUp({ content: 'Command not found.', ephemeral: true });
		return;

	},
};
