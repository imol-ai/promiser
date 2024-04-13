import { Command } from 'discord-akairo';
import { Message, GuildMember } from 'discord.js';
import { checkHierarchy } from '../../structures/custom-modules';

export default class KickCommand extends Command {
	public constructor() {
		super('kick', {
			// name
			aliases: ['kick'], // aliases
			description: {
				content: 'Kick a member from the guild.', // description
				usage: 'Kick <user>', // how to use
				examples: ['kick @FadeDave#7005', 'kick 347822600136949763'], // exampleArray
			},
			userPermissions: ['KICK_MEMBERS'],
			channel: 'guild',
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: (msg: Message) => `Provide a member to kick, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid member to kick, ${msg.author}:`,
					},
				},
			],
		});
	}
	public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message | void> {
		if (checkHierarchy(this.client, message, member) != undefined) return Promise.resolve();
		if (member.kickable) {
			member.kick().catch(() => null);
			return message.util?.send(`"${member}" has been kicked.`);
		} else {
			return message.util?.reply('That member is not kickable. The bot is missing permissions, or the member is a server owner.');
		}
	}
}
