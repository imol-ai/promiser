import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import Genius from 'genius-lyrics';
import { geniusKey } from '../../config';

export default class LyricsCommand extends Command {
	constructor() {
		super('lyrics', {
			aliases: ['lyrics', 'ly'],
			description: {
				content: 'Get lyrics for a song.',
				usage: 'lyrics',
				examples: ['ly', 'lyrics imagine dragons'],
			},
			args: [
				{
					id: 'search',
					type: 'string',
					default: (message: Message) => {
						return this.client.player.nowPlaying(message)?.title;
					},
					match: 'rest',
				},
			],
		});
	}
	public async exec(message: Message, { search }: { search: string }): Promise<Message | undefined> {
		type raw = {
			lyrics_state: string;
		};
		if (message.util?.parsed?.content?.length == 0) message.util?.send('Trying automatic lyrics search... ');
		const genius = new Genius.SongsClient(geniusKey);
		if (!search) return message.util?.send("You can't get the lyrics of nothing.");
		const anysongs = await genius.search(search).catch(() => null);
		if (!anysongs) return message.util?.send('No song found.');
		const songs = anysongs.filter((e) => (e.raw as raw).lyrics_state == 'complete');
		const lyrics = await songs[0]?.lyrics().catch(async () => {
			return await songs[1]?.lyrics().catch(async () => {
				return await songs[2]?.lyrics().catch(() => null);
			});
		});
		if (!lyrics) return message.util?.send('No lyrics found.');
		return message.util?.send(lyrics.toString(), { split: true, code: true }).catch(() => message.util?.send('No lyrics found.'));
	}
}
