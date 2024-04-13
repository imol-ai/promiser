import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class GuildsCommand extends Command {
	public constructor() {
		super('guilds', {
			// name
			aliases: ['guilds', 'servers'], // aliases
			description: {
				content: 'Get the all joined guilds..', // description
				usage: 'guilds', // how to use
				examples: ['servers'], // exampleArray
			},
			ownerOnly: true,
		});
	}
	public async exec(message: Message): Promise<Message | undefined> {
		void message.util?.send('### START SERVER ECHO ###');
		this.client.guilds.cache.forEach((guild) => {
			void message.util?.send(`${guild.name} | ${guild.id}`);
		});
		return message.util?.send('### END SERVER ECHO ###');
	}
}
