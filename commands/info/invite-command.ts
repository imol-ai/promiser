import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class HelpCommand extends Command {
	public constructor() {
		super('invite', {
			// name
			aliases: ['invite', 'inv'], // aliases
			description: {
				content: 'Get the invite for the bot', // description
				usage: 'invite', // how to use
				examples: ['invite'], // exampleArray
			},
		});
	}
	public async exec(message: Message): Promise<Message | undefined> {
		const embed = new MessageEmbed()
			.setTitle('Invite the bot to your own server')
			.setColor('RANDOM')
			.setDescription(
				`[Remember that this is an administration bot, so you need to give it all the necessary permissions, else it won't work correctly.](https://discord.com/oauth2/authorize?client_id=${this.client.user?.id}&permissions=2147483647&scope=bot)`,
			);
		return message.util?.send(embed);
	}
}
