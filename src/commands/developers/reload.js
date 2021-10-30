const fs = require('fs');

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


		if (!fs.existsSync(`${__dirname}/../general/${command}.js`)) {
			interaction.reply({ content: 'Command not found.', ephemeral: true });
			return;
		}

		delete require.cache[require.resolve(`${__dirname}/../general/${command}.js`)];
		client.commands.delete(command);

		try {
			const data = require(`${__dirname}/../general/${command}.js`);
			client.commands.set(data.name, data);

			interaction.reply({ content: `Command \`${data.name}\` reloaded successfully.`, ephemeral: true });
		}
		catch (error) {
			interaction.reply({ content: `Command \`${command}\` reload failed with error \`${error}\`. Full error logged to console.`, ephemeral: true });
		}

	},
};
