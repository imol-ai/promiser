import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';
import { checkHierarchy } from '../../structures/custom-modules';

export default class UnMuteCommand extends Command {
	public constructor() {
		super('unmute', {
			// name
			aliases: ['unmute'], // aliases
			description: {
				content: 'Unmute a member, guild wide.', // description
				usage: 'unmute <user>', // how to use
				examples: ['unmute @FadeDave#7005', 'unmute 347822600136949763'], // exampleArray
			},
			userPermissions: ['MANAGE_CHANNELS'],
			clientPermissions: ['ADMINISTRATOR'],
			channel: 'guild',
			cooldown: 10000,
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: (msg: Message) => `Provide a member to unmute, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid member to unmute, ${msg.author}:`,
					},
				},
			],
		});
	}
	public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message | void> {
		if (checkHierarchy(this.client, message, member) != undefined) return Promise.resolve();
		message.guild?.channels.cache.forEach((c) => void c.permissionOverwrites.get(member.id)?.delete());

		return message.util?.send(`**${member.user.tag}** has been unmuted by **${message.author.tag}**.`);
	}
}
