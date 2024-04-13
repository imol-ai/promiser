import { Token, OwnerId } from './config';
import BotClient from './client/botclient';

const client: BotClient = new BotClient({ Token, OwnerId });
void client.start();
