import { ConnectionManager } from 'typeorm';
import { dbName } from '../config';

import { Warns } from '../models/warns';
import { Giveaways } from '../models/giveaways';
import { Prefix } from '../models/prefix';
import { Blacklist } from '../models/blacklist';

const connectionManager: ConnectionManager = new ConnectionManager();
connectionManager.create({
	name: dbName,
	type: 'sqlite',
	database: 'db.sqlite',
	entities: [Warns, Giveaways, Prefix, Blacklist],
});

export default connectionManager;
