import { Command } from 'discord-akairo';
import { Message, GuildMember, User, MessageEmbed } from 'discord.js';
import { Repository } from 'typeorm';

import { Warns } from '../../models/warns';

export default class InfractionsCommand extends Command {
	public constructor() {
		super('infractions', {
			// name
			aliases: ['infractions', 'infraq'], // aliases
			description: {
				content: 'Check for use infractions', // description
				usage: 'infractions <member>', // how to use
				examples: ['infractions @FadeDave#7005', 'infractions FadeDave'], // exampleArray
			},
			userPermissions: ['MANAGE_MESSAGES'],
			channel: 'guild',
			args: [
				{
					id: 'member',
					type: 'member',
					default: (msg: Message) => msg.member,
				},
			],
		});
	}
	public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message | undefined> {
		const warnRepo: Repository<Warns> = this.client.db.getRepository(Warns);
		const warns: Warns[] = await warnRepo.find({
			user: member.id,
			guild: message.guild?.id,
		});

		if (!warns.length) return message.util?.reply(`No infractions found for ${member} `);

		const infractions = await Promise.all(
			warns.map(async (v: Warns, i: number) => {
				const mod: User | undefined = await this.client.users.fetch(v.moderator).catch(() => undefined);
				if (mod) {
					return {
						index: i + 1,
						moderator: mod.tag,
						time: new Date(v.time * 1000).toString().substr(4, 27),
						reason: v.reason,
					};
				}
			}),
		);
		return message.util
			?.send(
				new MessageEmbed()
					.setAuthor(`Infractions | ${member.user.username}`, member.user.displayAvatarURL())
					.setColor('RANDOM')
					.setDescription(infractions.map((v) => `\`#${v?.index}\` | Moderator: **${v?.moderator}** | Recorded at: **${v?.time}**\nReason: **\`${v?.reason}\`**\n`)),
			)
			.catch(() => message.util?.send('An unknown error has occurred.'));
	}
}
