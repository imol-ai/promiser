import { Command } from 'discord-akairo';
import { Message, MessageReaction, User } from 'discord.js';

export default class RandomReactionCommand extends Command {
	public constructor() {
		super('randomreact', {
			// name
			aliases: ['randomreact', 'rr'], // aliases
			description: {
				content: "Get a random reaction from a message's first reaction.", // description
				usage: 'rr <message id>', // how to use
				examples: ['rr 806927872404881409'], // exampleArray
			},
			args: [
				{
					id: 'msg',
					type: 'message',
					prompt: {
						start: (msg: Message) => `Provide a message to get a random reaction from, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid message to get a random reaction from, ${msg.author}:`,
					},
				},
			],
		});
	}
	public async exec(message: Message, { msg }: { msg: Message }): Promise<Message | undefined> {
		const reaction: MessageReaction | undefined = await msg.reactions.cache.first()?.fetch();
		if (!reaction) return message.util?.send("Message doesn't exist, or is missing reactions.");
		await reaction.users.fetch();
		const winner: User = reaction.users.cache.filter((w) => !w.bot).random();
		return message.util?.send(`${winner} was randomly selected from the first reaction!`);
	}
}
