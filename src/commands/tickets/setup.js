const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
	name: 'setup',
	description: 'Setup a channel for tickets!',
	usage: '<channel>',

	permissions: ['Manage Server'],
	ownerOnly: false,

	options: [
		{ name: 'channel', description: 'Shos details about how to use a command', type: 'CHANNEL', required: true },
	],

	error: false,
	execute: async ({ interaction }) => {

		const channel = interaction.options.getChannel('channel');

		const embed = new MessageEmbed()
			.setColor('#0099FF')
			.setTitle('Discord Creators | Support')
			.setDescription('If you have any questions, create a ticket by clicking the button below.')
			.setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
			.setTimestamp();

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle('SUCCESS').setLabel('Open a ticket').setCustomId('create_ticket'),
			);

		channel.send({ embeds: [embed], components: [row] });

		interaction.followUp({ content: 'Tickets have been set up.' });
	},
};