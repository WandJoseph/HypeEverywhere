import { Repository } from 'typeorm';
import { Before, BaseCrudContext } from '~/utils/crud';
import { HttpCrudService } from '~/utils/crud/http-crud.service';
import { TechniqueHttpService } from './technique.http.service';

export interface NestedInTechniqueCHS<Entity> {
  shouldExistTechnique(ctx: BaseCrudContext): void;
}
