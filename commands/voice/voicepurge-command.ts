import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class VoiceRemoveCommand extends Command {
	public constructor() {
		super('voiceremove', {
			aliases: ['voiceremove', 'vrm', 'vremove'],
			description: {
				content: 'Removes a song from the queue of the current server.',
				usage: 'voiceremove',
				examples: ['vrm'],
			},
			channel: 'guild',
			args: [
				{
					id: 'toremove',
					type: 'number',
					prompt: {
						start: (msg: Message) => `Provide a song to remove from the queue, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid song to remove from the queue, ${msg.author}:`,
					},
				},
			],
		});
	}

	public async exec(message: Message, { toremove }: { toremove: number }): Promise<Message | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		if (!this.client.player.getQueue(message)) return message.util?.send('There is no queue in this server!');
		if (toremove == 1) return message.util?.send("You can't remove the currently playing song!");
		if (toremove == 0 || toremove > this.client.player.getQueue(message).tracks.length) return message.util?.send("An entry with that id doesn't exist on the server's queue.");
		const track = this.client.player.remove(message, toremove - 1);
		return message.util?.send(`Removed \`${track.title}\` from the queue.`);
	}
}
