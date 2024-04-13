import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class MissingPermissionsCommand extends Listener {
	public constructor() {
		super('missingPermissions', {
			emitter: 'commandHandler',
			event: 'missingPermissions',
		});
	}
	public async exec(message: Message, command: Message, reason: string): Promise<Message | undefined> {
		if (reason == 'client') return message.util?.reply('The bot is missing permissions to execute the command!');
		if (reason == 'user') return message.util?.reply("You don't have permission to execute this command!");
		if (reason == 'hierarchy') return message.util?.reply('You are not high enough in the rank hierarchy to do that!');
		return message.util?.reply('Missing permissions! `' + reason + '`');
	}
}
