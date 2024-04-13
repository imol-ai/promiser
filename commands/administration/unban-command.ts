import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class UnbanCommand extends Command {
	public constructor() {
		super('unban', {
			// name
			aliases: ['unban', 'unyeet'], // aliases
			description: {
				content: 'Remove a previous ban.', // description
				usage: 'unban <user>', // how to use
				examples: ['unban 347822600136949763', 'unban FadeDave#7005'], // exampleArray
			},
			userPermissions: ['BAN_MEMBERS'],
			channel: 'guild',
			args: [
				{
					id: 'user',
					type: 'string',
					match: 'rest',
					prompt: {
						start: (msg: Message) => `Provide a user to unban, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid user to unban, ${msg.author}:`,
					},
				},
			],
		});
	}
	public async exec(message: Message, { user }: { user: string }): Promise<Message | undefined> {
		const bans = await message.guild?.fetchBans();
		if (!bans || bans.size === 0) return message.util?.send('There are no bans in this guild!');
		const usr = bans.find((u) => u.user.id === user) ?? bans.find((u) => u.user.tag === user) ?? bans.find((u) => u.user.username === user);
		if (!usr) return message.util?.send('No ban with the specified search term exists.');
		void message.guild?.members.unban(usr.user.id);
		return message.util?.send(usr.user.tag + ' unbanned successfully.');
	}
}
