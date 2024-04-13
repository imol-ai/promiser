import { Message, MessageEmbed } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Playlist } from 'discord-player';

export default class PlaylistParseEndListener extends Listener {
	public constructor() {
		super('playlistparseend', {
			event: 'playlistParseEnd',
			emitter: 'player',
		});
	}

	public async exec(playlist: Playlist, message: Message): Promise<Message | undefined> {
		if (playlist.title) {
			const embed = new MessageEmbed();
			embed
				.setTitle('Playlist added to queue')
				.setDescription(`[${playlist.title}](${playlist.url})\nFrom ${playlist.channel?.name}\nRequested by ${playlist.requestedBy.tag}\nSongs added: ${playlist.videoCount}`)
				.setThumbnail(playlist.thumbnail)
				.setColor('RANDOM');
			return message.util?.send(embed);
		} else {
			const embed = new MessageEmbed();
			embed
				.setTitle('Playlist added to queue')
				.setDescription(`Requested by ${playlist.requestedBy.tag}\nSongs added: ${playlist.tracks.length}`)
				.setThumbnail(playlist.thumbnail)
				.setColor('RANDOM');
			return message.util?.send(embed);
		}
	}
}
