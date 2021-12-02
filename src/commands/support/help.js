const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');

module.exports = {
	name: 'help',
	description: 'Provides a list of all my commands!',
	usage: '[command]',

	permissions: [],
	ownerOnly: false,

	options: [
		{ name: 'command', description: 'Shows details about how to use a command', type: 'STRING', required: false },
	],

	error: false,
	execute: async ({ interaction, client }) => {

		const cmdName = interaction.options.getString('command');
		const cmd = client.commands.get(cmdName);

		if (cmd) {

			const embed = new MessageEmbed()
				.setColor('#0099FF')
				.setTitle(cmd.name.charAt(0).toUpperCase() + cmd.name.slice(1) + ' Command')
				.setDescription(cmd.description)
				.setTimestamp();

			embed.addField('__Usage:__', '/' + cmd.name + (cmd.usgae ? ' ' + cmd.usage : ''), false);

			if (cmd.permissions[0] && cmd.ownerOnly == false) {
				embed.addField('__Permissions:__', '`' + cmd.permissions.join('` `') + '`', false);
			}
			if (!cmd.permissions[0] && cmd.ownerOnly == true) {
				embed.addField('__Permissions:__', '**Server Owner Only**', false);
			}
			if (cmd.error == true) {
				embed.addField('__Error:__', 'This command is currently unavailable, please try again later.', false);
			}

			interaction.followUp({ embeds: [embed], ephemeral: false });

		}
		else {

			const embed = new MessageEmbed()
				.setColor(process.env['Color'])
				.setTitle(client.user.username + ' Commands')
				.setDescription('To view the information about a certain command\ndo `/help <command>`.')
				.setThumbnail(client.user.displayAvatarURL())
				.setTimestamp();

			for (const category of ['general', 'support']) {

				const commandFiles = readdirSync(__dirname + '/../' + category).filter(file => file.endsWith('.js'));
				const commands = commandFiles.map(f => f.slice(0, f.length - 3));

				embed.addField(`__${category.charAt(0).toUpperCase() + category.slice(1)}__`, `\`${commands.join('` `')}\``, false);
			}

			interaction.followUp({ embeds: [embed], ephemeral: false });

		}

	},
};