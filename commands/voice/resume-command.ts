import { Command } from 'discord-akairo';
import { MessageReaction } from 'discord.js';
import { Message } from 'discord.js';

export default class ResumeCommand extends Command {
	public constructor() {
		super('resume', {
			aliases: ['resume'],
			description: {
				content: 'Resumes music playback.',
				usage: 'resume',
				examples: ['resume'],
			},
			channel: 'guild',
		});
	}

	public async exec(message: Message): Promise<Message | MessageReaction | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		if (!this.client.player.getQueue(message).paused) return message.util?.send('Music is not paused!');
		this.client.player.resume(message);
		return message.react('👌');
	}
}
