import { Listener } from 'discord-akairo';
import { Collector } from 'discord.js';
import { Message } from 'discord.js';
import { Track } from 'discord-player';

export default class SearchInvalidListener extends Listener {
	constructor() {
		super('searchinvalid', {
			emitter: 'player',
			event: 'searchInvalidResponse',
		});
	}

	public async exec(message: Message, query: string, tracks: Track[], content: string, collector: Collector<Track, Track>): Promise<Message | undefined> {
		if (content === 'exit') {
			collector.stop();
			return message.util?.send('Search cancelled!');
		}
		return message.util?.sendNew('Reply with a valid number between 1 and ' + tracks.length.toString());
	}
}
