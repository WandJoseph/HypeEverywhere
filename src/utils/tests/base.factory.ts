import Casual from 'casual';

export abstract class BaseFactory<Entity> {
  protected readonly casual: Casual.Generators &
    Casual.Casual = require('casual');

  abstract dto(data?: Partial<any>): any;
}
