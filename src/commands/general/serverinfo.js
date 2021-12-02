const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const premiumTier = { NONE: 'None', TIER_1: 'Level 1', TIER_2: 'Level 2', TIER_3: 'Level 3' };
const mfaLevel = { NONE: 'Off', ELEVATED: 'On' };
const verificationLevel = { NONE: 'None.', LOW: 'Low: verified email required.', MEDIUM: 'Medium: on Discord for 5 minutes.', HIGH: 'High: on the server for 10 minutes.', VERY_HIGH: 'Very High: verified phone number.' };

module.exports = {
	name: 'serverinfo',
	description: 'Shows information about the server',
	usage: '',

	permissions: [],
	ownerOnly: false,

	error: false,
	execute: async ({ interaction }) => {

		const guild = interaction.guild;

		const ageTimestamp = new Date() - guild.createdTimestamp;
		const age = `${Math.floor(ageTimestamp / 86400000)}d ${Math.floor(ageTimestamp / 3600000) % 24}h ${Math.floor(ageTimestamp / 60000) % 60}m ${Math.floor(ageTimestamp / 1000) % 60}s`;


		const embed = new MessageEmbed()
			.setColor(process.env['Color'])
			.setAuthor(`${interaction.member.user.username} (${interaction.member.id})`, interaction.member.displayAvatarURL())
			.setTitle(`${guild.name}'s Information`)
			.setThumbnail(guild.iconURL({ dynamic: true }))
			.addFields(
				{ name: '**Server Name**', value: `${guild.name}`, inline: true },
				{ name: '**Server ID**', value: `${guild.id}`, inline: true },
				{ name: '**Server Owner**', value: `<@!${guild.ownerId}>`, inline: true },

				{ name: '**Created At**', value: `${moment(guild.createdAt).format('DD/MM/YYYY LTS')}`, inline: true },
				{ name: '**Server Age**', value: `${age}`, inline: true },
				{ name: '**Highest Role**', value: `${guild.roles.highest}`, inline: true },

				{ name: '**Member Count**', value: `${guild.memberCount}/${guild.maximumMembers}`, inline: true },
				{ name: '**Emoji Count**', value: `${guild.emojis.cache.size}`, inline: true },
				{ name: '**Channel Count**', value: `${guild.channels.cache.size}`, inline: true },

				{ name: '**Verification Level**', value: `${verificationLevel[guild.verificationLevel]}`, inline: true },
				{ name: '**MFA Level**', value: `${mfaLevel[guild.mfaLevel]}`, inline: true },
				{ name: '**Nitro Boost Level**', value: `${premiumTier[guild.premiumTier]}`, inline: true },
			)
			.setFooter(`Requested by ${interaction.member.user.tag}`)
			.setTimestamp();

		interaction.followUp({ embeds: [embed] });

	},
};