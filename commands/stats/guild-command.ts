import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class GuildCommand extends Command {
	public constructor() {
		super('guild', {
			// name
			aliases: ['guild', 'server'], // aliases
			description: {
				content: 'Get the stats of the guild.', // description
				usage: 'guild', // how to use
				examples: ['guild'], // exampleArray
			},
			channel: 'guild',
		});
	}
	public async exec(message: Message): Promise<Message | undefined> {
		const guild = message.guild;
		if (!guild) return;
		const embed = new MessageEmbed()
			.setTitle(`Guildinfo for \`${guild.name}\``)
			.setColor('RANDOM')
			.setDescription(
				`
        **Created at:** ${guild.createdAt.toString().substr(4, 27)}\n
        **GuildID:** ${guild.id}\n
        **Description:** ${guild.description ? guild.description : 'Guild has no description.'}\n

        `,
			)
			.addField(
				'**Normal emojis**',
				'\u2192' +
					guild.emojis.cache
						.filter((em) => !em.animated)
						.map((emoji) => emoji.toString())
						.join('')
						.slice(0, 1023)
						.slice(
							0,
							guild.emojis.cache
								.filter((em) => !em.animated)
								.map((emoji) => emoji.toString())
								.join('')
								.slice(0, 1023)
								.lastIndexOf('>') + 1,
						),
			)
			.addField(
				'**Animated emojis**',
				'\u2192' +
					guild.emojis.cache
						.filter((em) => em.animated)
						.map((emoji) => emoji.toString())
						.join('')
						.slice(0, 1023)
						.slice(
							0,
							guild.emojis.cache
								.filter((em) => em.animated)
								.map((emoji) => emoji.toString())
								.join('')
								.slice(0, 1023)
								.lastIndexOf('>') + 1,
						),
			)
			.setImage(guild.iconURL() as string);
		return message.util?.send(embed);
	}
}
