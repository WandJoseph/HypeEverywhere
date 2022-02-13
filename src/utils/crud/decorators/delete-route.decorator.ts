import { applyDecorators, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestResponse } from '~/utils/http/bad-request-response';
import { EntityDeletedResponse } from '~/utils/http/entity-deleted-response';

export interface DeleteRouteOptions {
  path?: string;
  type?: any;
}

export const DeleteRoute = (options?: DeleteRouteOptions) => {
  const { path, type } = options || {};
  const entityName = (type && type.name) || 'Entity';
  return applyDecorators(
    Delete(path || ':id'),
    ApiResponse({
      status: 200,
      type: EntityDeletedResponse,
      description: `${entityName} deleted successfully`,
    }),
    ApiResponse({
      status: 400,
      type: BadRequestResponse,
      description: `Could not create ${entityName}, bad request`,
    }),
    ApiResponse({
      status: 404,
      description: `Could not create ${entityName}, Entity not found`,
    }),
  );
};
