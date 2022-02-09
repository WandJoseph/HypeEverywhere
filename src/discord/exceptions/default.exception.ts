import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';

export class DefaultException extends Error {
  public error: string;
  constructor(
    private readonly ctx: DiscordCrudContext,
    message = 'Error Inesperado',
  ) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.error = 'Unexpected Error';
  }
}
