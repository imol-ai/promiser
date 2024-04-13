import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SearchCancelListener extends Listener {
	public constructor() {
		super('searchcancel', {
			emitter: 'player',
			event: 'searchCancel',
		});
	}

	public async exec(message: Message): Promise<void | Message> {
		return message.util?.send('Search timed out!');
	}
}
