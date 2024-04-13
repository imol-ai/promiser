import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class LoopCommand extends Command {
	public constructor() {
		super('loop', {
			aliases: ['loop'],
			description: {
				content: 'Loops/ unloops the queue.',
				usage: 'loop',
				examples: ['loop'],
			},
			channel: 'guild',
		});
	}

	public async exec(message: Message): Promise<Message | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		if (!this.client.player.getQueue(message)) return message.util?.send('There is no queue in this server!');
		if (this.client.player.getQueue(message).loopMode) {
			this.client.player.setLoopMode(message, false);
			return message.util?.send('Disabled loop mode.');
		}
		if (!this.client.player.getQueue(message).loopMode) {
			this.client.player.setLoopMode(message, true);
			return message.util?.send('Enabled loop mode.');
		}
	}
}
