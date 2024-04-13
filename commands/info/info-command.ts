import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { OwnerId, OwnerAvatar } from '../../config';

export default class InfoCommand extends Command {
	public constructor() {
		super('info', {
			// name
			aliases: ['info'], // aliases
			description: {
				content: 'Verbose info on the bot & client.', // description
				usage: 'info', // how to use
				examples: ['info'], // exampleArray
			},
		});
	}
	public async exec(message: Message): Promise<Message | undefined> {
		const embed = new MessageEmbed()
			.setAuthor('Info', this.client.user?.displayAvatarURL())
			.setColor('RANDOM')
			.setDescription(
				`
        Creator: **FadeDave#7005(${OwnerId})**
        Version: **0.8.0**


        Shards: **${this.client.ws.shards.size}**
        `,
			)
			.setThumbnail(OwnerAvatar);
		return message.util?.send(embed);
	}
}
