import { BaseCrudContext } from '~/utils/crud/base-crud-context.interface';

export interface NestedInUserService<Entity> {
  shouldExistUser(ctx: BaseCrudContext): void;
}
