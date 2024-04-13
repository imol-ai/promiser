import { Listener } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PlayerErrorListener extends Listener {
	constructor() {
		super('playererror', {
			emitter: 'player',
			event: 'error',
		});
	}

	public exec(message: Message, error: string): Promise<Message> | undefined {
		switch (error) {
			case 'NotPlaying':
				return message.util?.send('There is no music being played on this server!');
			case 'NotConnected':
				return message.util?.send('You are not connected in any voice channel!');
			case 'UnableToJoin':
				return message.util?.send('I am not able to join your voice channel, please check my permissions!');
			case 'LiveVideo':
				return message.util?.send('YouTube lives are not supported!');
			case 'VideoUnavailable':
				return message.util?.send('This YouTube video is not available!');
			default:
				return message.util?.send(`Something went wrong... Error: ${error}`);
		}
	}
}
