const discordControllerControllersMetdataKey = Symbol(
  'discord.controllers:controllers',
);

const discordControllerOptionsMetdataKey = Symbol(
  'discord.controllers:options',
);

export interface ControllerOptions {
  collection?: string;
}

export class DiscordControllerMetadataHandler {
  getControllers(): any[] {
    const commands =
      Reflect.getMetadata(
        discordControllerControllersMetdataKey,
        DiscordControllerMetadataHandler,
      ) || [];
    return commands;
  }
  private setControllers(controllers: any[]) {
    Reflect.defineMetadata(
      discordControllerControllersMetdataKey,
      controllers,
      DiscordControllerMetadataHandler,
    );
  }
  addController(controller: any) {
    const controllers = this.getControllers();
    controllers.push(controller);
    this.setControllers(controllers);
  }

  getOptions(controller: any): ControllerOptions {
    const options =
      Reflect.getMetadata(discordControllerOptionsMetdataKey, controller) || {};
    return options;
  }
  setOptions(controller: any, options?: ControllerOptions) {
    Reflect.defineMetadata(
      discordControllerOptionsMetdataKey,
      options,
      controller,
    );
  }
}
export function DiscordController(options?: ControllerOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function _DiscordController<T extends { new (...args: any[]): {} }>(
    constr: T,
  ) {
    return class extends constr {
      constructor(...args: any[]) {
        super(...args);
        const handler = new DiscordControllerMetadataHandler();
        handler.addController(this);
        handler.setOptions(this, options);
      }
    };
  };
}
