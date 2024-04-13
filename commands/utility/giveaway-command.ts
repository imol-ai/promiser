import { Command } from 'discord-akairo';
import { Message, MessageEmbed, User, MessageReaction } from 'discord.js';
import ms from 'ms';
import { Repository } from 'typeorm';

import { Giveaways } from '../../models/giveaways';
import GiveawayManager from '../../structures/giveawaymanager';

export default class GiveawayCommand extends Command {
	public constructor() {
		super('giveaway', {
			// name
			aliases: ['giveaway', 'gaway'], // aliases
			description: {
				content: 'Start a giveaway', // description
				usage: 'giveaway <time> <winners> <item> -f (who is giving it away)', // how to use
				examples: ['giveaway 5d 3 uwuw owo', 'gaway 1w 69 nice -f @Wumpus#6969'], // exampleArray
			},
			cooldown: 10000,
			channel: 'guild',
			args: [
				{
					id: 'time',
					type: (msg: Message, str: string) => {
						if (str) if (!isNaN(Number(ms(str)))) return Number(ms(str));
					},
					prompt: {
						start: (msg: Message) => `${msg.author}, you need to provide a time when the giveaway will end!`,
						retry: (msg: Message) => `${msg.author}, please provide a valid time!`,
					},
				},
				{
					id: 'winners',
					type: 'number',
					prompt: {
						start: (msg: Message) => `${msg.author}, please provide how many winners you would like!`,
						retry: (msg: Message) => `${msg.author}, please provide a valid amount of winners!`,
					},
				},
				{
					id: 'item',
					type: 'string',
					match: 'rest',
					prompt: {
						start: (msg: Message) => `${msg.author}, provide an item to give away!`,
					},
				},
				{
					id: 'from',
					match: 'option',
					flag: ['-f', '--from'],
					type: 'user',
					default: (msg: Message) => msg.author,
				},
			],
		});
	}
	public async exec(message: Message, { time, item, winners, from }: { time: number; item: string; winners: number; from: User }): Promise<MessageReaction | undefined> {
		const giveawayRepo: Repository<Giveaways> = this.client.db.getRepository(Giveaways);
		const end: number = Date.now() + time;
		if (!message.util) return;
		const msg: Message = await message.util.send(
			new MessageEmbed()
				.setAuthor('Giveaway!')
				.setColor(0x00ff00)
				.setDescription(
					winners == 1
						? `${from} is giving away **${item}**! React below for a chance to win!`
						: `${from} is giving away **${item}** to ${winners} winners! React below for a chance to win!`,
				)
				.setFooter(`Giveaway will end at ${new Date(end).toString().substr(4, 27)}`),
		);
		void giveawayRepo.insert({
			channel: msg.channel.id,
			message: msg.id,
			time: Math.round(Date.now() / 1000),
			end: Math.round(end / 1000),
			winners: winners,
			from: from.id,
			item: item,
		});
		setTimeout(() => {
			message.delete().catch(() => null);
		}, 5000);
		setTimeout(() => {
			void GiveawayManager.end(giveawayRepo, msg);
		}, time);
		return msg.react('🎉');
	}
}
