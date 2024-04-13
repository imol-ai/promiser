import { Message, MessageEmbed } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Playlist } from 'discord-player';

export default class PlaylistParseStartListener extends Listener {
	public constructor() {
		super('playlistparsestart', {
			event: 'playlistParseStart',
			emitter: 'player',
		});
	}

	public async exec(playlist: Playlist, message: Message): Promise<Message | undefined> {
		const embed = new MessageEmbed();
		embed.setTitle('Playlist parsing, please wait...').setColor('RANDOM');
		return message.util?.sendNew(embed);
	}
}
