import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';
import { Track } from 'discord-player';
import { MessageEmbed } from 'discord.js';

export default class ResultFoundListener extends Listener {
	public constructor() {
		super('resultfound', {
			emitter: 'player',
			event: 'searchResults',
		});
	}

	public async exec(message: Message, query: string, tracks: Track[]): Promise<void | Message> {
		const embed = new MessageEmbed();
		embed.setTitle('Search results for ' + query);
		tracks = [...tracks.slice(0, 10)];
		tracks.forEach((e) => embed.addField(`\`${tracks.indexOf(e) + 1}\` ${e.title} \`${e.duration}\``, `From ${e.author}\n${e.views} views`));
		embed.setFooter('Reply with the id of the song you would like to play, or with `exit` to exit the prompt.');
		embed.setColor('RANDOM');
		return message.util?.send(embed);
	}
}
