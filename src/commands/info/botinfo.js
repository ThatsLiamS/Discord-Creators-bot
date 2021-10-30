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

		const version = 'development';

		const embed = new MessageEmbed()
			.setTitle('My Information')
			.setDescription(`Nice to meet you!, I'm **${client.user.tag}**!`)
			.setThumbnail(`${client.user.displayAvatarURL()}`)
			.addFields(
				{ name: '**Uptime:**', value: `${uptime}`, inline: true },
				{ name: '**Ping**', value: `${client.ws.ping}ms`, inline: true },
				{ name: '**Age**', value: `${age}`, inline: true },

				{ name: '**Discord.js Version**', value: '13.2.0', inline: true },
				{ name: '**Node.js Version**', value: '16.x', inline: true },
				{ name: '**Developers:**', value: '**[ThatsLiamS#6950](https://github.com/ThatsLiamS)**\n**[SunkenSplashGaming#4953](https://github.com/SunkenSplash)**\n**[Bagel#1475](https://github.com/bagelwastaken)**', inline: true },
			)
			.setFooter(`Version: ${version}`);


		interaction.reply({ embeds: [embed] });

	},
};

