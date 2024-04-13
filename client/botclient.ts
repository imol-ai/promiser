import { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } from 'discord-akairo';
import { Message, Intents } from 'discord.js';
import { join } from 'path';
import { Connection } from 'typeorm';
import { OwnerId, dbName, Prefix as defaultPrefix } from '../config';
import Database from '../structures/database';
import { Prefix } from '../models/prefix';
import { Player } from 'discord-player';

declare module 'discord-akairo' {
	interface AkairoClient {
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
		inhibitorHandler: InhibitorHandler;
		db: Connection;
		player: Player;
	}
}

interface BotOptions {
	Token?: string;
	OwnerId?: string | string[];
}

export default class BotClient extends AkairoClient {
	public config: BotOptions;
	public db!: Connection;
	public inhibitorHandler: InhibitorHandler = new InhibitorHandler(this, {
		directory: join(__dirname, '..', 'inhibitors'),
		automateCategories: true,
	});
	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, '..', 'listeners'),
		automateCategories: true,
	});
	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, '..', 'commands'),
		prefix: async (message) => {
			if (message.guild) {
				const newPrefix = await this.db
					.getRepository(Prefix)
					.findOne({ guild: message.guild.id })
					.then((e) => {
						return e?.value;
					})
					.catch(() => null);
				return newPrefix ? newPrefix : defaultPrefix;
			}
			return defaultPrefix;
		},
		allowMention: true,
		blockBots: true,
		blockClient: true,
		handleEdits: true,
		aliasReplacement: /-/g,
		commandUtil: true,
		commandUtilLifetime: 300000,
		storeMessages: false,
		defaultCooldown: 1000,
		automateCategories: true,
		fetchMembers: false,
		argumentDefaults: {
			prompt: {
				cancelWord: 'exit',
				modifyStart: (_: Message, str: string): string => `${str}\n\nType \`exit\` to exit the prompt.`,
				modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`exit\` to exit the prompt.`,
				timeout: "You didn't answer in time, the prompt exited automatically.",
				ended: 'You have exceeded the maximum amount of tries, the command exited.',
				cancel: 'Command cancelled.',
				retries: 3,
				time: 30000,
			},
			otherwise: '',
		},
		ignorePermissions: OwnerId,
	});
	public player = new Player(this, {
		leaveOnEmpty: true,
		leaveOnStop: true,
		leaveOnEnd: true,
		leaveOnEndCooldown: 900000,
		quality: 'high',
		enableLive: false,
		ytdlRequestOptions: { filter: 'audioonly', quality: 'highestaudio' },
		autoSelfDeaf: true,
	});
	public constructor(config: BotOptions) {
		super({
			ownerID: config.OwnerId,
			intents: Intents.ALL,
			partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
			presence: { status: 'dnd' },
		});
		this.config = config;
	}
	private async _init(): Promise<void> {
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			inhibitorHandler: this.inhibitorHandler,
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			player: this.player,
			process,
		});
		this.inhibitorHandler.loadAll();
		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();

		this.db = Database.get(dbName);
		await this.db.connect();
		await this.db.synchronize();
	}
	public async start(): Promise<string> {
		await this._init();
		return this.login(this.config.Token);
	}
}
