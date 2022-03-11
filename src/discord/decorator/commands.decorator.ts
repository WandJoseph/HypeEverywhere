export type ParameterType = 'message' | 'channel' | 'author' | 'args';

const parametersMetadataKey = Symbol('discord.commands:parameters');
const commandOptionsMetadataKey = Symbol('discord.commands:commands-options');
const commandsMetadataKey = Symbol('discord.commands:commands');
export interface CommandOptions {
  name: string;
  description: string;
  aliases?: string[];
  parameters?: string;
}

export interface Parameter {
  index: number;
  type: ParameterType;
  propertyKey?: string | symbol;
}
export class DiscordCommandMetadataHandler {
  constructor(private readonly target: any) {}

  getCommands(): string[] {
    const commands =
      Reflect.getMetadata(commandsMetadataKey, this.target) || [];
    return commands;
  }
  private setCommands(commands: string[]) {
    Reflect.defineMetadata(commandsMetadataKey, commands, this.target);
  }
  addCommands(propertyKey: string) {
    const commands = this.getCommands();
    commands.push(propertyKey);
    this.setCommands(commands);
  }

  getCommandOptions(propertyKey: string): CommandOptions {
    const commandOptions = Reflect.getMetadata(
      commandOptionsMetadataKey,
      this.target,
      propertyKey,
    );
    return commandOptions;
  }
  setCommandOptions(options: CommandOptions, propertyKey: string) {
    Reflect.defineMetadata(
      commandOptionsMetadataKey,
      options,
      this.target,
      propertyKey,
    );
  }
  getCommandParameters(propertyKey: string): Parameter[] {
    const parameters =
      Reflect.getMetadata(parametersMetadataKey, this.target, propertyKey) ||
      [];
    return parameters;
  }
  private setCommandParameters(parameters: Parameter[], propertyKey: string) {
    Reflect.defineMetadata(
      parametersMetadataKey,
      parameters,
      this.target,
      propertyKey,
    );
  }
  addCommandParameter(
    index: number,
    type: ParameterType,
    propertyKey: string | symbol,
  ) {
    const parameter: Parameter = {
      index,
      type,
      propertyKey,
    };
    const parameters = this.getCommandParameters(propertyKey as string);
    parameters.push(parameter);
    this.setCommandParameters(parameters, propertyKey as string);
  }
}

export const Command =
  (options: CommandOptions) => (target: any, propertyKey: string) => {
    const handler = new DiscordCommandMetadataHandler(target);
    options.name = options.name.toLowerCase();
    if (!options?.name) {
      options.name = 'default';
    }
    handler.setCommandOptions(options, propertyKey);
    handler.addCommands(propertyKey);
    return target;
  };

export const Msg =
  () => (target: any, propertyKey: string | symbol, index: number) => {
    const type: ParameterType = 'message';
    const handler = new DiscordCommandMetadataHandler(target);
    handler.addCommandParameter(index, type, propertyKey);
  };

export const Author =
  () => (target: any, propertyKey: string | symbol, index: number) => {
    const type: ParameterType = 'author';
    const handler = new DiscordCommandMetadataHandler(target);
    handler.addCommandParameter(index, type, propertyKey);
  };

export const Channel =
  () => (target: any, propertyKey: string | symbol, index: number) => {
    const type: ParameterType = 'channel';
    const handler = new DiscordCommandMetadataHandler(target);
    handler.addCommandParameter(index, type, propertyKey);
  };

export const Args =
  () => (target: any, propertyKey: string | symbol, index: number) => {
    const type: ParameterType = 'args';
    const handler = new DiscordCommandMetadataHandler(target);
    handler.addCommandParameter(index, type, propertyKey);
  };
