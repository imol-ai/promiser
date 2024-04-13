import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class GuildMemberCommand extends Command {
	public constructor() {
		super('members', {
			// name
			aliases: ['members', 'guildmembers'], // aliases
			description: {
				content: 'Get the all members of the guild.', // description
				usage: 'members', // how to use
				examples: ['guildmembers'], // exampleArray
			},
			cooldown: 30000,
			channel: 'guild',
			userPermissions: 'ADMINISTRATOR',
		});
	}
	public async exec(message: Message): Promise<Message | undefined> {
		void message.util?.send('### START MEMBER ECHO ###');
		message.guild?.members.cache.forEach((member) => {
			void message.util?.send(`${member.user.tag} | ${member.id}`);
		});
		return message.util?.send('### END MEMBER ECHO ###');
	}
}
