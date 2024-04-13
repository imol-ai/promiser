import { Command } from 'discord-akairo';
import { Message, MessageEmbed, User } from 'discord.js';

export default class UserCommand extends Command {
	public constructor() {
		super('user', {
			// name
			aliases: ['user', 'member'], // aliases
			description: {
				content: 'Get the stats of a user.', // description
				usage: 'user (user)', // how to use
				examples: ['user', 'user @FadeDave#7005'], // exampleArray
			},
			args: [
				{
					id: 'user',
					type: 'user',
					match: 'rest',
					default: (msg: Message) => msg.author,
				},
			],
		});
	}
	public async exec(message: Message, { user }: { user: User }): Promise<Message | undefined> {
		const embed = new MessageEmbed()
			.setTitle(`Userinfo for \`${user.tag}\``)
			.setColor('RANDOM')
			.setDescription(
				`
        **Created at:** ${user.createdAt.toString().substr(4, 27)}\n
        **UserID:** ${user.id}\n
        **IsBot:** ${user.bot}\n
        **Status:** ${user.presence.status}

        **Avatar:**`,
			)
			.setImage(user.avatarURL() as string);
		return message.util?.send(embed);
	}
}
