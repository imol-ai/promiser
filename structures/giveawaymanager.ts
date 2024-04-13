import { Message, MessageEmbed, MessageReaction } from 'discord.js';
import { Repository } from 'typeorm';
import { Giveaways } from '../models/giveaways';

export default {
	async end(giveawayRepo: Repository<Giveaways>, msg: Message): Promise<void> {
		await msg.fetch().catch(() => null);
		const entry = await giveawayRepo.findOne({ message: msg.id });
		if (!entry) return;
		let winamount = entry.winners;
		const reaction: MessageReaction | undefined = await msg?.reactions?.cache
			?.filter((r) => r.emoji.name === '🎉')
			?.first()
			?.fetch();
		if (!reaction) return;
		await reaction.users.fetch();
		if (reaction.users.cache.filter((w) => !w.bot).array().length < winamount) winamount = reaction.users.cache.filter((w) => !w.bot).array().length;
		const winnera = reaction.users.cache
			.filter((w) => !w.bot)
			.random(winamount)
			.map((u) => `<@${u.id}>`);
		const winners = winnera.toString();

		const embed: MessageEmbed | undefined = msg?.embeds[0];
		if (!embed) return;
		embed
			.setFooter('Giveaway has ended.')
			.setColor(0xff0000)
			.addField(winnera.length == 1 ? 'Winner:' : 'Winners:', winners ? winners : 'No winners :pensive:')
			.setDescription(`<@${entry.from}> was giving away **${entry.item}**.`);
		void msg.edit(embed);

		if (winners) {
			void msg.channel.send(
				`Giveaway has ended for the item **${entry.item}** from **<@${entry.from}>**, ${
					winnera.length == 1 ? `the winner is: ${winners}.` : `the winners are: ${winners}.`
				} https://discord.com/channels/${msg.guild?.id}/${entry.channel}/${entry.message}`,
			);
		}
		void giveawayRepo.delete({ message: msg.id });
	},
};
