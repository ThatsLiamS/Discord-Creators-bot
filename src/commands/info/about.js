const { MessageEmbed } = require('discord.js');
const pm = require('pretty-ms');
module.exports = {
	name: 'info',
	description: 'About the bot!',
	args: 0,
	permissions: [],
	ownerOnly: false,

	error: false,
	execute: async ({ client, interaction }) => {
		const uptime = `${Math.floor(client.uptime / 86400000)}d ${Math.floor(client.uptime / 3600000) % 24}h ${Math.floor(client.uptime / 60000) % 60}m ${Math.floor(client.uptime / 1000) % 60}s`;
		const age = Date.now() - client.user.createdTimestamp;
		const version = 'development';

		const embed = new MessageEmbed()
			.setTitle('My Information')
		// .setColor('Insert hex code here')
			.setDescription(`Nice to meet you!, I'm **${client.user.tag}**!`)
			.setThumbnail(`${client.user.displayAvatarURL()}`)
			.addFields(

				{ name: '**Uptime:**', value: `${uptime}`, inline: true },
				{ name: '**Ping**', value: `${client.ws.ping}ms`, inline: true },
				{ name: '**Age**', value: `${pm(age)}`, inline: true },

				{ name: '**Discord.js Version**', value: '13.2.0', inline: true },
				{ name: '**Node.js Version**', value: '16.x', inline: true },
				{ name: '**Developers:**', value: '**[Bagel#1475](https://github.com/bagelwastaken)**\n**[ThatsLiamS#6950](https://github.com/ThatsLiamS)**\n**[SunkenSplashGaming#4953](https://github.com/SunkenSplash)**', inline: true },
			)
			.setFooter(`Version: ${version}`);
		interaction.reply({ embeds: [embed] });
	},
};

