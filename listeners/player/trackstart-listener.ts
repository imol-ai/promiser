import { Message, MessageEmbed, Util } from 'discord.js';
import { Listener } from 'discord-akairo';
import { Track, Queue } from 'discord-player';

export default class TrackStartListener extends Listener {
	public constructor() {
		super('trackstart', {
			emitter: 'player',
			event: 'trackStart',
		});
	}

	public async exec(message: Message, track: Track, queue: Queue): Promise<void> {
		const embed = new MessageEmbed();
		embed
			.setTitle('Playing now')
			.setDescription(
				`[${track.title}](${track.url}) \`${track.duration}\`\nFrom ${track.author}\nRequested by ${track.requestedBy.tag}\n${queue.tracks.length - 1} remaining tracks`,
			)
			.setThumbnail(track.thumbnail)
			.setColor('RANDOM');
		const msg = message.util?.sendNew(embed);
		await Util.delayFor(240000);
		void (await msg)?.delete();
	}
}
