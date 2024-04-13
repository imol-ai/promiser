import { Message, MessageEmbed } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Queue, Track } from 'discord-player';

export default class TrackAddListener extends Listener {
	public constructor() {
		super('trackadd', {
			event: 'trackAdd',
			emitter: 'player',
		});
	}

	public async exec(message: Message, queue: Queue, track: Track): Promise<Message | undefined> {
		const embed = new MessageEmbed();
		embed
			.setTitle('Track added to queue')
			.setDescription(
				`[${track.title}](${track.url}) \`${track.duration}\`\nFrom ${track.author}\nRequested by ${track.requestedBy.tag}\n${queue.tracks.length - 1} tracks before this`,
			)
			.setThumbnail(track.thumbnail)
			.setColor('RANDOM');
		return message.util?.sendNew(embed);
	}
}
