import {
  Message,
  MessageEditOptions,
  MessagePayload,
  TextChannel,
} from 'discord.js';
import { DiscordCrudContext } from '~/utils/crud/discord-crud.context.interface';

const send = async (
  content: string | MessageEditOptions | MessagePayload,
  message?: Message,
  channel?: TextChannel,
) => {
  return message ? await message.edit(content) : await channel.send(content);
};
export const onMessageErrorHandler = async (
  message: Message,
  error: any,
  channel?: TextChannel,
) => {
  const ctx: DiscordCrudContext = error?.ctx;
  if (!ctx) {
    const formatedResponse = `${message?.author || 'Error'}, ${error.message}`;
    await send(formatedResponse, message, channel);
    return;
  }
  const type = error.error;
  const errorMessage = error.message;
  const responseAuthor = ctx.author || message?.author || 'Error';
  const responseChannel = ctx.responseChannel;
  const formatedResponse = `${responseAuthor}, ${errorMessage} - \`${type}\``;
  if (responseChannel) {
    await responseChannel.send(formatedResponse);
  } else if (ctx.msg) {
    await ctx.msg.edit(formatedResponse);
  } else {
    await message.channel.send(formatedResponse);
  }
};
