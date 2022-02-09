import { BaseCrudContext } from '../base-crud-context.interface';

const BASE_CRUD_BEFORE_METHODS = 'base-crud:before-methods';
const BASE_CRUD_AFTER_METHODS = 'base-crud:after-methods';

export type MethodKeys = 'create' | 'update' | 'delete' | 'findOne' | 'findAll';

export interface Method {
  (ctx: BaseCrudContext): any;
}

export type CrudMethods = {
  [key in MethodKeys]: string[];
};

export class BaseCrudMetadataHandler {
  constructor(private readonly t: any) {}

  getAllBeforeMethods(): CrudMethods {
    const methods = Reflect.getMetadata(BASE_CRUD_BEFORE_METHODS, this.t) || {
      create: [],
      update: [],
      delete: [],
      findOne: [],
      findAll: [],
    };
    return methods;
  }
  private setAllBeforeMethods(crudMethods: CrudMethods): void {
    Reflect.defineMetadata(BASE_CRUD_BEFORE_METHODS, crudMethods, this.t);
  }
  getAllAfterMethods(): CrudMethods {
    const methods = Reflect.getMetadata(BASE_CRUD_AFTER_METHODS, this.t) || {
      create: [],
      update: [],
      delete: [],
      findOne: [],
      findAll: [],
    };
    return methods;
  }
  private setAllAfterMethods(crudMethods: CrudMethods): void {
    Reflect.defineMetadata(BASE_CRUD_AFTER_METHODS, crudMethods, this.t);
  }
  getBeforeMethods(methodKey: MethodKeys): string[] {
    const methods = this.getAllBeforeMethods()[methodKey];

    return methods;
  }
  addBeforeMethod(methodKey: MethodKeys, method: string): void {
    const methods = this.getAllBeforeMethods();
    methods[methodKey].push(method);
    this.setAllBeforeMethods(methods);
  }
  getAfterMethods(methodKey: MethodKeys): string[] {
    const methods = this.getAllAfterMethods()[methodKey];
    return methods;
  }
  addAfterMethod(methodKey: MethodKeys, method: string): void {
    const methods = this.getAllAfterMethods();
    methods[methodKey].push(method);
    this.setAllAfterMethods(methods);
  }
}

export const Before =
  (methodKey: MethodKeys) => (target: any, propertyKey: string) => {
    const handler = new BaseCrudMetadataHandler(target);
    handler.addBeforeMethod(methodKey, propertyKey);
  };

export const After =
  (methodKey: MethodKeys) => (target: any, propertyKey: string) => {
    const handler = new BaseCrudMetadataHandler(target);
    handler.addAfterMethod(methodKey, propertyKey);
  };
