import { BaseCrudContext } from './base-crud-context.interface';

const BASE_CRUD_BEFORE_METHODS = 'base-crud:before-methods';
const BASE_CRUD_AFTER_METHODS = 'base-crud:after-methods';

export type MethodKeys = 'create' | 'update' | 'delete' | 'findOne' | 'findAll';

export interface Method {
  (ctx: BaseCrudContext): any;
}

export type CrudMethods = {
  [key in MethodKeys]: Method[];
};

export class BaseCrudMetadataHandler {
  constructor(private readonly target: any) {}

  private getAllBeforeMethods(): CrudMethods {
    const methods = Reflect.getMetadata(
      BASE_CRUD_BEFORE_METHODS,
      this.target,
    ) || {
      create: [],
      update: [],
      delete: [],
      findOne: [],
      findAll: [],
    };
    return methods;
  }
  private setAllBeforeMethods(crudMethods: CrudMethods): void {
    Reflect.defineMetadata(BASE_CRUD_BEFORE_METHODS, crudMethods, this.target);
  }
  private getAllAfterMethods(): CrudMethods {
    const methods = Reflect.getMetadata(
      BASE_CRUD_AFTER_METHODS,
      this.target,
    ) || {
      create: [],
      update: [],
      delete: [],
      findOne: [],
      findAll: [],
    };
    return methods;
  }
  private setAllAfterMethods(crudMethods: CrudMethods): void {
    Reflect.defineMetadata(BASE_CRUD_AFTER_METHODS, crudMethods, this.target);
  }
  getBeforeMethods(methodKey: MethodKeys): Method[] {
    const methods = this.getAllBeforeMethods()[methodKey];
    return methods;
  }
  addBeforeMethod(methodKey: MethodKeys, method: Method): void {
    const methods = this.getAllBeforeMethods();
    methods[methodKey].push(method);
    this.setAllBeforeMethods(methods);
  }
  getAfterMethods(methodKey: MethodKeys): Method[] {
    const methods = this.getAllAfterMethods()[methodKey];
    return methods;
  }
  addAfterMethod(methodKey: MethodKeys, method: Method): void {
    const methods = this.getAllAfterMethods();
    methods[methodKey].push(method);
    this.setAllAfterMethods(methods);
  }
}

export const Before =
  (methodKey: MethodKeys) => (target: any, propertyKey: string) => {
    const handler = new BaseCrudMetadataHandler(target);
    handler.addBeforeMethod(methodKey, target[propertyKey]);
  };

export const After =
  (methodKey: MethodKeys) => (target: any, propertyKey: string) => {
    const handler = new BaseCrudMetadataHandler(target);
    handler.addAfterMethod(methodKey, target[propertyKey]);
  };
