import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';
import { DefaultException } from './default.exception';

export class EntityFoundException extends DefaultException {
  constructor(ctx: DiscordCrudContext, message: string) {
    super(ctx, message);
    this.name = this.constructor.name;
    this.message = message;
    this.error = 'Entity Found';
  }
}
