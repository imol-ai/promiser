import { Inhibitor } from 'discord-akairo';
import { Message } from 'discord.js';

export default class /* name */ extends Inhibitor {
	public constructor() {
		super('', {
			reason: '',
		});
	}

	public async exec(message: Message): Promise<any> {

		return true;
	}
}
