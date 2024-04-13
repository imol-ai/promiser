import { GuildMember, Message } from 'discord.js';
import { AkairoClient } from 'discord-akairo';
import { OwnerId } from '../config';

// Custom functions
export function checkHierarchy(client: AkairoClient, message: Message, member: GuildMember): boolean | undefined {
	if (!message.member || !message.guild) return;
	if (member.roles.highest.position >= message.member?.roles.highest.position && message.author.id !== message.guild?.ownerID && message.author.id !== OwnerId)
		return client.commandHandler.emit('missingPermissions', message, message.util?.parsed?.command, 'hierarchy');

	return;
}
