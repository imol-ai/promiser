import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class ShuffleCommand extends Command {
	public constructor() {
		super('shuffle', {
			aliases: ['shuffle'],
			description: {
				content: 'Shuffles the queue.',
				usage: 'shuffle',
				examples: ['shuffle'],
			},
			channel: 'guild',
		});
	}

	public async exec(message: Message): Promise<Message | undefined> {
		this.client.player.shuffle(message);
		return message.util?.send('Shuffled the queue.');
	}
}
