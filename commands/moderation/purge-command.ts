import { Command } from 'discord-akairo';
import { Message, GuildMember, TextChannel } from 'discord.js';

export default class PurgeCommand extends Command {
	public constructor() {
		super('purge', {
			// name
			aliases: ['purge', 'rm', 'clean', 'prune', 'delete', 'remove'], // aliases
			description: {
				content: 'Deletes specified amount of messages up to 1000.', // description
				usage: 'rm <amount> (member)', // how to use
				examples: ['rm 420', 'rm 69', 'rm 19 @FadeDave#7005'], // exampleArray
			},
			userPermissions: ['MANAGE_MESSAGES'],
			channel: 'guild',
			args: [
				{
					id: 'amount',
					type: 'number',
					default: 1,
				},
				{
					id: 'member',
					type: 'member',
				},
			],
		});
	}
	public async exec(message: Message, { amount, member }: { amount: number; member: GuildMember }): Promise<Message | undefined> {
		const channel = message.channel as TextChannel;
		if (member) {
			if (amount < 1 || amount > 1000 || isNaN(amount) || !amount) {
				return message.util?.send('Please provide a valid amount of messages to delete in the 1-1000 range.');
			} else {
				const original = amount;
				while (amount > 0) {
					if (amount <= 100) {
						await channel.messages
							.fetch()
							.then((messages) => messages.filter((author) => author.author.id == member.user.id))
							.then((e) => e.firstKey(amount))
							.then(async (messages) => {
								await channel.bulkDelete(messages).catch(() => null);
							});
						break;
					} else {
						await channel.messages
							.fetch()
							.then((messages) => messages.filter((author) => author.author.id == member.user.id))
							.then((e) => e.firstKey(100))
							.then(async (messages) => {
								await channel.bulkDelete(messages).catch(() => null);
							});
						amount -= 100;
						continue;
					}
				}
				setTimeout(() => {
					message.util?.lastResponse?.delete().catch(() => null);
					message.delete().catch(() => null);
				}, 5000);
				if (original == 1) return message.util?.send(`Removed one message from ${member}.`);
				else return message.util?.send(`Removed ${original} messages from ${member}.`);
			}
		} else if (amount < 1 || amount > 1000 || isNaN(amount) || !amount) {
			return message.util?.send('Please provide a valid amount of messages to delete in the 1-1000 range.');
		} else {
			const original = amount;
			amount++;
			while (amount > 0) {
				if (amount <= 100) {
					await channel.messages.fetch({ limit: amount }).then(async (messages) => {
						await channel.bulkDelete(messages).catch(() => null);
					});
					break;
				} else {
					await channel.messages.fetch({ limit: 100 }).then(async (messages) => {
						await channel.bulkDelete(messages).catch(() => null);
					});
					amount -= 100;
					continue;
				}
			}
			setTimeout(() => {
				message.util?.lastResponse?.delete().catch(() => null);
			}, 5000);
			if (original == 1) return message.util?.send('Removed one message.');
			else return message.util?.send(`Removed ${original} messages.`);
		}
	}
}
