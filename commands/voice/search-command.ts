import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SearchCommand extends Command {
	public constructor() {
		super('search', {
			aliases: ['search'],
			description: {
				content: "Play music in the user's voice channel.",
				usage: 'play <search or link from youtube/spotify/soundcloud>',
				examples: ['play cute cats and kittens', 'play https://youtu.be/dQw4w9WgXcQ', 'play https://open.spotify.com/track/7HlUypREKtZQmSA0cC064V?si=YrtC51b1S1GEGGvW6EW7VQ'],
			},
			channel: 'guild',
			args: [
				{
					id: 'query',
					type: 'string',
					match: 'rest',
					prompt: {
						start: 'Please input a search string or URL.',
						retry: 'Please input a valid search string or URL.',
					},
				},
			],
		});
	}
	public async exec(message: Message, { query }: { query: string }): Promise<Message | void> {
		if (this.client.voice.connections.find((e) => e.channel.guild === message.guild) && !this.client.voice.connections.find((e) => e.channel === message.member?.voice.channel))
			return message.util?.send('You are not in the same voice channel as the bot, you cannot control it!');
		if (!message.member?.voice.channel) return message.util?.send('Please join a voice channel first!');
		return await this.client.player.play(message, query);
	}
}
