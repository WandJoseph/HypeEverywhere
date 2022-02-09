import { DiscordModule } from '../discord.module';

export type ParameterType = 'message' | 'channel' | 'author';

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
export class CommandDecoratorHandler {
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

export function DiscordController() {
  return function _DiscordController<T extends { new (...args: any[]): {} }>(
    constr: T,
  ) {
    return class extends constr {
      constructor(...args: any[]) {
        super(...args);
        const controllers =
          Reflect.getMetadata(
            'discord.controllers:controllers',
            DiscordModule,
          ) || [];
        controllers.push(this);
        Reflect.defineMetadata(
          'discord.controllers:controllers',
          controllers,
          DiscordModule,
        );
      }
    };
  };
}

export const Command =
  (options: CommandOptions) => (target: any, propertyKey: string | symbol) => {
    const handler = new CommandDecoratorHandler(target);
    handler.setCommandOptions(options, propertyKey as string);
    handler.addCommands(propertyKey as string);
    return target;
  };

export const Msg =
  () => (target: any, propertyKey: string | symbol, index: number) => {
    const type: ParameterType = 'message';
    const handler = new CommandDecoratorHandler(target);
    handler.addCommandParameter(index, type, propertyKey);
  };

export const Author =
  () => (target: any, propertyKey: string | symbol, index: number) => {
    const type: ParameterType = 'author';
    const handler = new CommandDecoratorHandler(target);
    handler.addCommandParameter(index, type, propertyKey);
  };

export const Channel =
  () => (target: any, propertyKey: string | symbol, index: number) => {
    const type: ParameterType = 'channel';
    const handler = new CommandDecoratorHandler(target);
    handler.addCommandParameter(index, type, propertyKey);
  };
