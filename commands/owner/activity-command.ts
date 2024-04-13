import { Command } from 'discord-akairo';
import { ActivityType, Message } from 'discord.js';

export default class ActivityCommand extends Command {
	public constructor() {
		super('activity', {
			aliases: ['activity'], // aliases
			description: {
				content: "Set the bot's activity.", // description
				usage: 'activity <status>', // how to use
				examples: ['activity cock'], // exampleArray
			},
			ownerOnly: true,
			args: [
				{
					id: 'type',
					type: (msg: Message, str: string) => {
						if (str == 'PLAYING' || str == 'STREAMING' || str == 'LISTENING' || str == 'WATCHING' || str == 'CUSTOM_STATUS' || str == 'COMPETING') return str;
					},
					prompt: {
						start: (msg: Message) => `Provide a type, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid type, ${msg.author}:`,
					},
				},
				{
					id: 'status',
					type: 'string',
					match: 'rest',
					prompt: {
						start: (msg: Message) => `Provide an activity, ${msg.author}:`,
						retry: (msg: Message) => `Provide a valid activity, ${msg.author}:`,
					},
				},
			],
		});
	}
	public async exec(message: Message, { status, type }: { status: string; type: ActivityType }): Promise<Message | undefined> {
		this.client.user?.setActivity({ name: status, type: type });
		return message.util?.send('Set activity to ' + status + '.');
	}
}
