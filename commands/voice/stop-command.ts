import { Command } from 'discord-akairo';
import { MessageReaction } from 'discord.js';
import { Message } from 'discord.js';

export default class StopCommand extends Command {
	public constructor() {
		super('stop', {
			aliases: ['stop'],
			description: {
				content: 'Stop the player.',
				usage: 'stop',
				examples: ['stop'],
			},
			channel: 'guild',
		});
	}
	public async exec(message: Message): Promise<Message | MessageReaction | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		if (!this.client.player.isPlaying(message)) return message.util?.send('The bot is not playing anything!');
		this.client.player.stop(message);
		return message.react('👌');
	}
}
