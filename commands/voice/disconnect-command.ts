import { Command } from 'discord-akairo';
import { MessageReaction } from 'discord.js';
import { Message } from 'discord.js';

export default class DisconnectCommand extends Command {
	public constructor() {
		super('disconnect', {
			aliases: ['disconnect', 'dc'],
			description: {
				content: "Disconnect from the user's voice channel. ",
				usage: 'dc',
				examples: ['dc'],
			},
			channel: 'guild',
		});
	}
	public async exec(message: Message): Promise<Message | MessageReaction | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel)?.disconnect();
		return message.react('👌');
	}
}
