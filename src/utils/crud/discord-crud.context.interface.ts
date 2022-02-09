import { Message, TextChannel, User } from 'discord.js';
import { BaseCrudContext } from './base-crud-context.interface';

export interface DiscordCrudContext extends BaseCrudContext {
  author?: User;
  entityName?: string;
  guild?: any;
  responseChannel?: TextChannel;
  msg?: Message;
}
