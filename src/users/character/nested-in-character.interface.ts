import { BaseCrudContext } from '~/utils/crud';

export interface NestedInCharacterService<Entity> {
  shouldExistCharacter(ctx: BaseCrudContext): void;
}
