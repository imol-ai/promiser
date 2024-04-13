import { Command } from 'discord-akairo';
import { Track } from 'discord-player';
import { MessageEmbed } from 'discord.js';
import { Message } from 'discord.js';

export default class QueueCommand extends Command {
	public constructor() {
		super('queue', {
			aliases: ['queue', 'q'],
			description: {
				content: 'Gets the queue of current server.',
				usage: 'queue',
				examples: ['queue'],
			},
			channel: 'guild',
		});
	}

	public async exec(message: Message): Promise<Message | undefined> {
		if (!this.client.player.getQueue(message)) return message.util?.send('There is no queue in this server!');
		const embed = new MessageEmbed();
		embed
			.setTitle('Queue of `' + String(message.guild?.name) + '`')
			.setDescription('\u2193 Now playing \u2193')
			.setColor('RANDOM');
		this.client.player
			.getQueue(message)
			.tracks.slice(0, 20)
			.forEach((e: Track) =>
				embed.addField(`\`${this.client.player.getQueue(message).tracks.indexOf(e) + 1}\` ${e.title} \`${e.duration}\``, `From ${e.author}\nRequested by ${e.requestedBy.tag}`),
			);
		if (this.client.player.getQueue(message).tracks.length > 21) embed.addField('And more:', `${this.client.player.getQueue(message).tracks.length - 20} more songs in queue.`);
		if (this.client.player.getQueue(message).tracks.length == 21) embed.addField('And more:', 'One more song in queue.');
		return message.util?.send(embed);
	}
}
