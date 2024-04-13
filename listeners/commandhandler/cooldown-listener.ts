import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class CoolDownListener extends Listener {
	public constructor() {
		super('cooldown', {
			emitter: 'commandHandler',
			event: 'cooldown',
		});
	}
	public async exec(message: Message, command: string, time: number): Promise<Message | undefined> {
		return message.util?.reply(`Please wait for ${time / 1000} seconds before using this command again!`);
	}
}
