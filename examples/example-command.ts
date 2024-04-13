import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class /* command*/ extends Command {
	public constructor() {
		super('', {
			aliases: ['', ''],
			description: {
				content: '',
				usage: '',
				examples: [''],
			},
		});
	}
	public async exec(message: Message): Promise<Message> {

		return message.util!.send();
	}
}
