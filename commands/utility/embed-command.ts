import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class EmbedCommand extends Command {
	public constructor() {
		super('embed', {
			// name
			aliases: ['embed', 'mkembed'], // aliases
			description: {
				content: 'Make an embed. (If your option includes spaces, you should put it in quotation marks.', // description
				usage: 'embed -t, --title; -c --color; -d --description; -i --image; -th --thumbnail;', // how to use
				examples: ['embed -t owo -d "uwu owo this is an epic description" -c 7700ff', 'embed -i "localhost:///home/fadedave/flushed.png"'], // exampleArray
			},
			args: [
				{
					id: 'title',
					type: 'string',
					match: 'option',
					flag: ['-t', '--title'],
				},
				{
					id: 'color',
					type: 'string',
					match: 'option',
					flag: ['-c', '--color'],
				},
				{
					id: 'description',
					type: 'string',
					match: 'option',
					flag: ['-d', '--description'],
				},
				{
					id: 'image',
					type: 'url',
					match: 'option',
					flag: ['-i', '--image'],
				},
				{
					id: 'thumbnail',
					type: 'url',
					match: 'option',
					flag: ['-th', '--thumbnail'],
				},
			],
		});
	}
	public async exec(
		message: Message,
		{
			title,
			color,
			description,
			image,
			thumbnail,
		}: {
			title: string;
			color: string;
			description: string;
			image: string;
			thumbnail: string;
		},
	): Promise<Message | undefined> {
		const embed = new MessageEmbed();
		if (title) embed.setTitle(`${title}`);
		if (description) embed.setDescription(`${description}`);
		if (image) embed.setImage(`${image}`);
		if (color) embed.setColor(`${color}`);
		if (thumbnail) embed.setThumbnail(`${thumbnail}`);
		setTimeout(() => {
			message.delete().catch(() => null);
		}, 5000);
		return message.util
			?.send(embed)
			.catch(() =>
				message.util?.reply('You made an error in your embed, and it threw an exception. Make sure that your embed is less than 2048 characters, that is a common problem.'),
			);
	}
}
