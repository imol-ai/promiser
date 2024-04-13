import { Command } from 'discord-akairo';
import { Message, MessageEmbed, Util } from 'discord.js';

export default class PingCommand extends Command {
	public constructor() {
		super('ping', {
			aliases: ['ping', 'bonk', 'latency', 'ms'],
			description: {
				content: 'Check the DiscordAPI latency.',
				usage: 'ping',
				examples: ['ping'],
			},
		});
	}
	public async exec(message: Message): Promise<Message | undefined> {
		const sstart = Date.now();
		const sent = await message.util?.reply('The embed will be here in any moment... just wait a moment... just wait a moment sir!');
		if (!sent) return;
		const timeDiff = (Number(sent.editedAt) || Number(sent.createdAt)) - (Number(message.editedAt) || Number(message.createdAt));
		const embed = new MessageEmbed().setTitle('Bonk! :flushed:').setColor('RANDOM');
		const start = Date.now();
		await Util.delayFor(100);
		let nd = Date.now() - start - 100;
		if (nd < 0) nd = 0;
		const end = nd.toString() + 'ms';
		const eend = (Date.now() - sstart - 100).toString() + 'ms';
		embed.setDescription(`
        Message return time: **${timeDiff}ms**
        DiscordAPI latency: **${this.client.ws.ping}ms**
        Exec function exec time: **${eend}**
        Simple code exec time: **${end}**`);
		return message.util?.send(embed);
	}
}
