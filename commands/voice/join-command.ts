import { Command } from 'discord-akairo';
import { MessageReaction } from 'discord.js';
import { Message } from 'discord.js';
import { OwnerId } from '../../config';

export default class JoinCommand extends Command {
	public constructor() {
		super('join', {
			aliases: ['join'],
			description: {
				content: "Join the user's voice channel. ",
				usage: 'join',
				examples: ['join'],
			},
			channel: 'guild',
		});
	}
	public async exec(message: Message): Promise<Message | MessageReaction | undefined> {
		if (!message.member?.voice.channel) return message.util?.send('Please join a voice channel first!');
		if (
			Number(this.client.voice.connections.find((e) => e.channel.guild === message.guild)?.channel.members.size) > 1 &&
			message.author.id != OwnerId &&
			!message.member.permissions.has('MOVE_MEMBERS')
		)
			return message.util?.send("Don't steal the music!");
		await message.member.voice.channel.join();
		return message.react('👌');
	}
}
