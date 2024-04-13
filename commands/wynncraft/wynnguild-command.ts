import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import query from 'querystring';
import { wynnGuildQuery } from '../../typings';

export default class WynnGuild extends Command {
	public constructor() {
		super('wynnguild', {
			// name
			aliases: ['wguild', 'wynnguild'], // aliases
			description: {
				content: 'Get info on a wynncraft guild', // description
				usage: 'wguild <guild name or tag>', // how to use
				examples: ['wguild Eden', 'wguild Goose'], // exampleArray
			},
			args: [
				{
					id: 'guild',
					type: 'string',
					match: 'rest',
					prompt: {
						start: (msg: Message) => `${msg.author}, please specify a guild!`,
						retry: (msg: Message) => `${msg.author}, please specify a valid guild!`,
					},
				},
			],
		});
	}
	public async exec(message: Message, { guild }: { guild: string }): Promise<Message | undefined> {
		const search = query.stringify({ command: guild });
		try {
			const data = await fetch(`https://api.wynncraft.com/public_api.php?action=guildStats&${search}`).then(async (res) => (await res.json()) as wynnGuildQuery);
			const embed = new MessageEmbed()
				.setTitle('Data for ' + guild)
				.setDescription(
					`Name: ${data.name} \n Tag: ${data.prefix} \n Xp: ${data.xp * 10}% \n Level: ${data.level} \n Created: ${data.createdFriendly} \n Territories: ${
						data.territories
					} \n BannerTier: ${data.banner.tier} \n\n **Members: ${data.members.length}**`,
				)
				.addField(
					'Rank Name',
					data.members
						.map((u) => {
							switch (u.rank) {
								case 'OWNER':
									return `\`*****${u.name}\``;
								case 'CHIEF':
									return `\`**** ${u.name}\``;
								case 'STRATEGIST':
									return `\`***  ${u.name}\``;
								case 'CAPTAIN':
									return `\`**   ${u.name}\``;
								case 'RECRUITER':
									return `\`*    ${u.name}\``;
								case 'RECRUIT':
									return `\`     ${u.name}\``;
							}
						})
						.slice(0, Math.floor(data.members.length / 2)),
					true,
				)
				.addField('Contributed', data.members.map((u) => `\`${u.contributed}\``).slice(0, Math.floor(data.members.length / 2)), true)
				.addField('Joined', data.members.map((u) => `\`${u.joined.slice(0, 10).replaceAll('-', '/')}\``).slice(0, Math.floor(data.members.length / 2)), true)
				.addField(
					'Rank Name',
					data.members
						.map((u) => {
							switch (u.rank) {
								case 'OWNER':
									return `\`*****${u.name}\``;
								case 'CHIEF':
									return `\`**** ${u.name}\``;
								case 'STRATEGIST':
									return `\`***  ${u.name}\``;
								case 'CAPTAIN':
									return `\`**   ${u.name}\``;
								case 'RECRUITER':
									return `\`*    ${u.name}\``;
								case 'RECRUIT':
									return `\`     ${u.name}\``;
							}
						})
						.slice(Math.floor(data.members.length / 2)),
					true,
				)
				.addField('Contributed', data.members.map((u) => `\`${u.contributed}\``).slice(Math.floor(data.members.length / 2)), true)
				.addField('Joined', data.members.map((u) => `\`${u.joined.slice(0, 10).replaceAll('-', '/')}\``).slice(Math.floor(data.members.length / 2)), true);
			return message.util?.send(embed);
		} catch {
			return message.util?.send('This guild does not exist. Please use the full name of the guild.');
		}
	}
}
