import { applyDecorators, Get } from '@nestjs/common';
import { ApiProperty, ApiResponse, PickType } from '@nestjs/swagger';
import { BadRequestResponse } from '~/utils/http/bad-request-response';
import { NotFoundResponse } from '~/utils/http/not-found-response';

export interface FindOneRouteOptions {
  path?: string;
  type?: any;
}

export const FindOneRoute = (options?: FindOneRouteOptions) => {
  const { path, type } = options || {};
  const entityName = (type && type.name) || 'Entity';

  return applyDecorators(
    Get(path || ':id'),
    ApiResponse({
      status: 200,
      type,
    }),
    ApiResponse({
      status: 404,
      type: NotFoundResponse,
      description: `${entityName} not found`,
    }),
    ApiResponse({
      status: 400,
      type: BadRequestResponse,
      description: `Could not find ${entityName}`,
    }),
  );
};
