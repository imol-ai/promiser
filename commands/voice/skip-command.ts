import { Command } from 'discord-akairo';
import { MessageReaction } from 'discord.js';
import { Message } from 'discord.js';

export default class SkipCommand extends Command {
	public constructor() {
		super('skip', {
			aliases: ['skip', 's'],
			description: {
				content: 'Skip to the next song in the queue.',
				usage: 'skip',
				examples: ['skip', 's'],
			},
			channel: 'guild',
		});
	}
	public async exec(message: Message): Promise<MessageReaction | Message | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		if (!this.client.player.getQueue(message)?.tracks) return message.util?.send("You can't skip in an empty queue!");
		if (this.client.player.getQueue(message).currentStreamTime <= 500) return message.util?.send('The song just started, please wait a moment!');
		this.client.player.skip(message);
		return message.react('👌');
	}
}
