export interface BaseCrudContext {
  id?: number | string;
  entity?: any;
  dto?: any;
  params?: any;
  query?: any;
  options?: any;
  result?: any;
}
