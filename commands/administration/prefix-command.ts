import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Repository } from 'typeorm';
import { Prefix as defaultPrefix } from '../../config';

import { Prefix } from '../../models/prefix';

export default class PrefixCommand extends Command {
	public constructor() {
		super('prefix', {
			// name
			aliases: ['prefix'], // aliases
			regex: /<*776129398834331700>/gi,
			description: {
				content: 'Change the prefix of the bot on the server.', // description
				usage: 'prefix <newprefix>', // how to use
				examples: ['prefix !'], // exampleArray
			},
			cooldown: 10000,
			channel: 'guild',
			userPermissions: ['ADMINISTRATOR'],
			args: [
				{
					id: 'prefix',
					type: 'string',
				},
			],
		});
	}
	public async exec(message: Message, { prefix }: { prefix: string }): Promise<Message | undefined> {
		const newPrefix = await this.client.db
			.getRepository(Prefix)
			.findOne({ guild: message.guild?.id })
			.then((e) => {
				return e?.value;
			})
			.catch(() => null);
		if (!prefix) return message.util?.send(`Current prefix is "${newPrefix ? newPrefix : defaultPrefix}".`);
		const prefixRepo: Repository<Prefix> = this.client.db.getRepository(Prefix);
		prefixRepo.delete({ guild: message.guild?.id }).catch(() => null);
		await prefixRepo.insert({
			guild: message.guild?.id,
			value: prefix,
		});
		return message.util?.send(`Changed prefix to "${prefix}".`);
	}
}
