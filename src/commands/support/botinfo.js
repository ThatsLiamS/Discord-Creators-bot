const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'botinfo',
	description: 'Shows information about the bot!',
	usage: '',

	permissions: [],
	ownerOnly: false,

	error: false,
	execute: async ({ client, interaction }) => {

		const uptime = `${Math.floor(client.uptime / 86400000)}d ${Math.floor(client.uptime / 3600000) % 24}h ${Math.floor(client.uptime / 60000) % 60}m ${Math.floor(client.uptime / 1000) % 60}s`;

		const ageTimestamp = new Date() - client.user.createdTimestamp;
		const age = `${Math.floor(ageTimestamp / 86400000)}d ${Math.floor(ageTimestamp / 3600000) % 24}h ${Math.floor(ageTimestamp / 60000) % 60}m ${Math.floor(ageTimestamp / 1000) % 60}s`;

		const version = process.env['Version'];

		const embed = new MessageEmbed()
			.setTitle('My Information')
			.setDescription(`Nice to meet you!, I'm **${client.user.tag}**!`)
			.setThumbnail(`${client.user.displayAvatarURL()}`)
			.addFields(
				{ name: '**Uptime**', value: `${uptime}`, inline: true },
				{ name: '**Ping**', value: `${client.ws.ping}ms`, inline: true },
				{ name: '**Age**', value: `${age}`, inline: true },
				{ name: '**Discord.js Version**', value: require('discord.js').version, inline: true },
				{ name: '**Node.js Version**', value: process.versions.node, inline: true },
				{ name: '**Developers**', value: '**[ThatsLiamS#6950](https://github.com/ThatsLiamS)**\n**[SunkenSplashGaming\n#4953](https://github.com/SunkenSplash)**\n**[Bagel#1475](https://github.com/bagelwastaken)**', inline: true },
			)
			.setFooter(`Version: ${version ? version : 'unknown'}`)
			.setColor(process.env['Color']);

		interaction.followUp({ embeds: [embed] });

	},
};

