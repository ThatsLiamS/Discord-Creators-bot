const { MessageEmbed, MessageButton, MessageActionRow, Permissions } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	once: false,

	execute: async (interaction, client) => {

		/* Is the interaction an ApplicationCommand? */
		if (interaction.isCommand()) {
			await interaction.deferReply();

			const cmd = client.commands.get(interaction.commandName);
			if (!cmd) return;


			if (cmd['error'] == true) {
				interaction.followUp({ content: 'Sorry, this command is currently unavailable. Please try again later.', ephemeral: true });
				return;
			}

			if (cmd['permissions'] != []) {
				for (const permission of cmd['permissions']) {
					/* Loops through and checks all permissions agasint the user */
					if (!interaction.member.permissions.has(permission)) {
						interaction.followUp({ content: 'Sorry, you do not have permission to run this command.', ephemeral: true });
						return;
					}
				}
			}

			if (cmd['ownerOnly'] == true) {
				if (!interaction.member.id == interaction.guild.ownerId) {
					interaction.followUp({ content: 'Sorry, only the server owner can run this command.', ephemeral: true });
					return;
				}
			}

			if (cmd['developerOnly'] == true) {
				const owners = await client.application.fetch().then(app => app.owner.members.map(member => member.id));
				if (!(owners.includes(interaction.member.id))) {
					interaction.followUp({ content: 'Sorry, this command is for developers only.', ephemeral: true });
					return;
				}
			}

			/* Executes command file */
			await cmd.execute({ interaction, client });

		}

		if (interaction.isButton()) {

			if (interaction.customId == 'delete_ticket_request') {
				/*  */
			}

			if (interaction.customId == 'create_ticket') {
				interaction.reply({ content: 'Creating your ticket now.', ephemeral: true });

				const embed = new MessageEmbed()
					.setColor('#0099FF')
					.setTitle('Discord Creators | Support')
					.setDescription('Support will be with you shortly.\nTo close this ticket react with 🔒')
					.setFooter(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
					.setTimestamp();

				const row = new MessageActionRow()
					.addComponents(
						new MessageButton()
							.setStyle('DANGER').setEmoji('🔒').setLabel('Close the ticket').setCustomId('delete_ticket_request'),
					);

				const channel = interaction.guild.channels.create(`support-${1}`, {
					parent: process.env['TicketParent'],
					permissionOverwrites: [{
						id: interaction.user.id,
						allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
					}],
				});
				channel.send({ content: `${interaction.member} Welcome. <@&714933854460313700> <@&> will be with you shortly`, embeds: [embed], components: [row] });
			}
		}

	},
};
