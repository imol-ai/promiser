import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import util from 'util';
import { OwnerId } from '../../config';

export default class EvalCommand extends Command {
	public constructor() {
		super('eval', {
			// name
			aliases: ['eval', 'neval'], // aliases
			description: {
				content: 'Evaluate an expression', // description
				usage: 'eval <command>', // how to use
				examples: ["neval message.util?.send('cock')", 'eval 2+2'], // exampleArray
			},
			ownerOnly: true,
			args: [
				{
					id: 'code',
					type: 'string',
					match: 'rest',
				},
			],
		});
	}
	public async exec(message: Message, { code }: { code: string }): Promise<void | Message> {
		if (code.toLowerCase().includes('token')) return message.util?.send('bro you think I would give you my token? fuck off');
		OwnerId;
		const clean = (text: string) => {
			if (typeof text === 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
			else return text;
		};
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			let evaled = await eval(code);
			if (typeof evaled !== 'string') evaled = util.inspect(evaled);
			if (message.util?.parsed?.alias == 'eval') return message.util?.send(clean(evaled), { split: true, code: 'js' });
		} catch (err) {
			return message.util?.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``, { split: true });
		}
	}
}
