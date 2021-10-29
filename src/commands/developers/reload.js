const { Interaction, MessageEmbed } = require('discord.js');
require('dotenv').config();

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

        try {
            const pull = require(`${__dirname}/../general/${command}.js`);
        } catch(error) {
            return interaction.reply({ content: 'Command not found.', ephemeral: true });
        }
        
        delete require.cache[require.resolve(`${__dirname}/../general/${command}.js`)];
        client.commands.delete(command);
        try {
            const data = require(`${__dirname}/../general/${command}.js`);
            client.commands.set(data.name, data);
            return interaction.reply({ content: `Command \`${data.name}\` reloaded successfully.`, ephemeral: true });
        }
        catch (error) {
            console.error(error);
            return interaction.reply({ content: `Command \`${command}\` reload failed with error \`${error}\`. Full error logged to console.`, ephemeral: true });
        }

    },
};