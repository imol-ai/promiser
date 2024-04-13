import { Command } from 'discord-akairo';
import { Message, MessageEmbed, ImageSize, User } from 'discord.js';

export default class AvatarCommand extends Command {
	public constructor() {
		super('avatar', {
			// name
			aliases: ['avatar', 'pfp'], // aliases
			description: {
				content: "Get a user's avatar", // description
				usage: 'avatar <user> (size 16--2048)', // how to use
				examples: ['avatar @FadeDave#7005', 'pfp 347822600136949763 512'], // exampleArray
			},
			args: [
				{
					id: 'user',
					type: 'user',
					match: 'rest',
					default: (msg: Message) => msg.author,
				},
				{
					id: 'size',
					type: (_: Message, str: string): null | number => {
						if (str && !isNaN(Number(str)) && [16, 32, 64, 128, 256, 512, 1024, 2048].includes(Number(str))) return Number(str);
						return null;
					},
					match: 'option',
					flag: ['-s', '--size'],
					default: 2048,
				},
			],
		});
	}
	public async exec(message: Message, { user, size }: { user: User; size: number }): Promise<Message | undefined> {
		return message.util?.send(
			new MessageEmbed()
				.setTitle(`Avatar for ${user.tag}`)
				.setColor('RANDOM')
				.setImage(user.displayAvatarURL({ size: size as ImageSize })),
		);
	}
}
