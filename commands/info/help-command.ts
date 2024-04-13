import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import { OwnerAvatar, Prefix as defaultPrefix } from '../../config';
import { Prefix } from '../../models/prefix';

export default class HelpCommand extends Command {
	public constructor() {
		super('help', {
			// name
			aliases: ['help', 'halp', 'commands', 'cmds'], // aliases
			description: {
				content: 'View available commands', // description
				usage: 'help (command)', // how to use
				examples: ['help', 'help ping'], // exampleArray
			},
			args: [
				{
					id: 'command',
					type: 'commandAlias',
					default: null,
				},
			],
		});
	}
	public async exec(message: Message, { command }: { command: Command }): Promise<Message | undefined> {
		type Description = {
			content: string;
			usage: string;
			examples: string[];
		};
		if (command) {
			return message.util?.send(
				new MessageEmbed().setAuthor(`Help for ${command}`, this.client.user?.displayAvatarURL()).setColor('RANDOM').setDescription(stripIndents`
					**Description:**
					${(command.description as Description).content || '*No description provided.*'}

					**Aliases:**
					${command.aliases.join(', ')}

					**Category:**
					${command.category}

					**Usage:**
					${(command.description as Description).usage || '*No usage provided.*'}

					**Examples:**
					${(command.description as Description).examples ? (command.description as Description).examples.map((p: string) => `\`${p}\``).join('\n') : '*No examples provided*.'}
				`),
			);
		}
		if (message.guild) {
			const newPrefix = await this.client.db
				.getRepository(Prefix)
				.findOne({ guild: message.guild.id })
				.then((e) => {
					return e?.value;
				})
				.catch(() => null);
			const embed = new MessageEmbed()
				.setAuthor(`Help | ${this.client.user?.username}`, this.client.user?.displayAvatarURL())
				.setColor('RANDOM')
				.setFooter(`${newPrefix ? newPrefix : defaultPrefix}help [command] for more info on a specific command`)
				.setDescription(
					`\n**An all rounder discord bot written by FadeDave#7005**\n\nCommand usage:\n\`${
						newPrefix ? newPrefix : defaultPrefix
					} [command] <required arg> (optional arg)\`\n\n**Available commands:**\n`,
				)
				.setThumbnail(OwnerAvatar);
			for (const category of this.handler.categories.values()) {
				if (['default'].includes(category.id)) continue;
				embed.addField(
					`${category.id}`,
					category
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => `\`${cmd}\``)
						.join('  ') || 'No commands in this category.',
				);
			}
			embed.addField(
				'Invite the bot to your own server',
				`Remember that this is an administration bot, so you need to give it all the necessary permissions, else it won't work correctly. [Click me](https://discord.com/oauth2/authorize?client_id=${this.client.user?.id}&permissions=2147483647&scope=bot)`,
			);
			return message.util?.send(embed);
		} else {
			const embed = new MessageEmbed()
				.setAuthor(`Help | ${this.client.user?.username}`, this.client.user?.displayAvatarURL())
				.setColor('RANDOM')
				.setFooter(`${defaultPrefix}help [command] for more info on a specific command`)
				.setDescription(
					`\n**An all rounder discord bot written by FadeDave#7005**\n
            \nCommand usage:\n\`${defaultPrefix} [command] <required arg> (optional arg)\`\n\n**Commands:**\n`,
				)
				.setThumbnail(OwnerAvatar);
			for (const category of this.handler.categories.values()) {
				if (['default'].includes(category.id)) continue;
				embed.addField(
					`${category.id}`,
					category
						.filter((cmd) => cmd.aliases.length > 0)
						.map((cmd) => `\`${cmd}\``)
						.join('  ') || 'No commands in this category.',
				);
			}
			embed.addField(
				'Invite the bot to your own server',
				`Remember that this is an administration bot, so you need to give it all the necessary permissions, else it won't work correctly.
        [Click me](https://discord.com/oauth2/authorize?client_id=${this.client.user?.id}&permissions=2147483647&scope=bot)`,
			);
			return message.util?.send(embed);
		}
	}
}
