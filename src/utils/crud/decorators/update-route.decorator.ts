import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestResponse } from '~/utils/http/bad-request-response';
import { EntityUpdatedResponse } from '~/utils/http/entity-updated-response';

export interface UpdateRouteOptions {
  path?: string;
  type?: any;
}

export const UpdateRoute = (options?: UpdateRouteOptions) => {
  const { path, type } = options || {};
  const entityName = (type && type.name) || 'Entity';
  return applyDecorators(
    Patch(path || ':id'),
    ApiResponse({
      status: 200,
      type: EntityUpdatedResponse,
      description: `${entityName} created successfully`,
    }),
    ApiResponse({
      status: 400,
      type: BadRequestResponse,
      description: `Could not update ${entityName}, bad request`,
    }),
    ApiResponse({
      status: 404,
      description: `Could not update ${entityName}, Entity not found`,
    }),
  );
};
