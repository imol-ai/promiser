import { Listener } from 'discord-akairo';
import { Message, MessageEmbed, TextChannel, GuildAuditLogsEntry, User, Util } from 'discord.js';

export default class MessageDeleteListener extends Listener {
	public constructor() {
		super('messageDelete', {
			event: 'messageDelete',
			emitter: 'client',
		});
	}
	public async exec(message: Message): Promise<Message | undefined> {
		type Extra = {
			channel: TextChannel;
			count: number;
		};

		const channel: TextChannel | undefined = message.guild?.channels.cache.find((c) => c.name.toLowerCase() === 'bot-log') as TextChannel;
		if (!channel) return;
		if (message.partial || message.author.bot) return;
		await Util.delayFor(1000);

		const logs = await message.guild?.fetchAuditLogs({ type: 72, limit: 6 });
		const entry = logs?.entries.find(
			(a: GuildAuditLogsEntry) => (a.target as User).id == message.author.id && (a.extra as Extra).channel.id === message.channel.id && Date.now() - a.createdTimestamp < 200000,
		);

		if (!channel) return;
		const attachments = message.attachments?.map((e) => e.proxyURL);
		const embed = new MessageEmbed().setAuthor('Message Deleted | Content:', message.author.displayAvatarURL({ dynamic: true })).setDescription(message.content);
		attachments[0] ? embed.setImage(attachments[0]) : null;
		attachments[1] ? embed.setThumbnail(attachments[1]) : null;
		embed
			.setColor(0xff0000)
			.addField('Author:', `${message.author} *${message.author.tag}* \`${message.author.id}\``)
			.addField('Channel:', `${message.channel} \`${message.channel.id}\``)
			.setFooter(new Date().toString().substr(4, 27));
		if (entry) embed.addField('Executor:', `${entry.executor} *${entry.executor.tag}* \`${entry.executor.id}\``);
		return channel.send(embed);
	}
}
