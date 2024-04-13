import { Command } from 'discord-akairo';
import { MessageEmbed } from 'discord.js';
import { Message } from 'discord.js';

export default class NowPlayingCommand extends Command {
	public constructor() {
		super('nowplaying', {
			aliases: ['nowplaying', 'np'],
			description: {
				content: 'Gets the currently playing song on the server.',
				usage: 'nowplaying',
				examples: ['np'],
			},
			channel: 'guild',
		});
	}

	public async exec(message: Message): Promise<Message | undefined> {
		if (!this.client.voice.connections.find((e) => e.channel.guild === message.guild)) return message.util?.send('The bot is not connected!');
		const embed = new MessageEmbed();
		const track = this.client.player.nowPlaying(message);
		embed
			.setTitle('Playing now')
			.setDescription(
				`[${track.title}](${track.url}) \`${track.duration}\`\nFrom ${track.author}\nRequested by ${track.requestedBy.tag}\n${
					this.client.player.getQueue(message).tracks.length - 1
				} remaining tracks\nProgress: ${this.client.player.createProgressBar(message)}`,
			)
			.setThumbnail(track.thumbnail)
			.setColor('RANDOM');
		return message.util?.send(embed);
	}
}
