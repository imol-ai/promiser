import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Repository } from 'typeorm';

import { Blacklist } from '../../models/blacklist';

export default class BlacklistCommand extends Command {
	public constructor() {
		super('blacklist', {
			// name
			aliases: ['blacklist', 'blist', 'unblist', 'unblacklist'], // aliases
			description: {
				content: 'Blacklist users.', // description
				usage: 'blacklist <user>', // how to use
				examples: ['blacklist 347822600136949763', 'unblist 347822600136949763'], // exampleArray
			},
			ownerOnly: true,
			args: [
				{
					id: 'user',
					type: 'string',
					prompt: {
						start: (msg: Message) => `Provide a user to blacklist, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid user to blacklist, ${msg.author}:`,
					},
				},
			],
		});
	}
	public async exec(message: Message, { user }: { user: string }): Promise<Message | void> {
		const blacklistRepo: Repository<Blacklist> = this.client.db.getRepository(Blacklist);
		if (message.util?.parsed?.alias == 'unblist' || message.util?.parsed?.alias == 'unblacklist') {
			await blacklistRepo.delete({ user: user });
			return message.util?.reply(user + ' has been un-blacklisted!');
		}
		await blacklistRepo.insert({
			user: user,
		});
		return message.util?.reply(user + ' has been blacklisted.');
	}
}
