import { Command } from 'discord-akairo';
import { MessageReaction } from 'discord.js';
import { Message } from 'discord.js';

export default class ClearCommand extends Command {
	public constructor() {
		super('clear', {
			aliases: ['clear'],
			description: {
				content: 'Clear the queue.',
				usage: 'clear',
				examples: ['clear'],
			},
			channel: 'guild',
		});
	}
	public async exec(message: Message): Promise<Message | MessageReaction | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		if (!this.client.player.getQueue(message)) return message.util?.send('There is no queue to clear!');
		this.client.player.clearQueue(message);
		this.client.player.setLoopMode(message, false);
		this.client.player.skip(message);
		return message.react('👌');
	}
}
