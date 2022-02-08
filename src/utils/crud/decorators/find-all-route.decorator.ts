import { applyDecorators, Get } from '@nestjs/common';
import { ApiProperty, ApiResponse, PickType } from '@nestjs/swagger';
import { BadRequestResponse } from '~/utils/validator/bad-request-response';

export interface FindAllRouteOptions {
  path?: string;
  type?: any;
}

export const FindAllRoute = (options?: FindAllRouteOptions) => {
  const { path, type } = options || {};
  const entityName = (type && type.name) || 'Entity';

  return applyDecorators(
    Get(path),
    ApiResponse({
      status: 200,
      description: `${entityName} deleted successfully`,
    }),
    ApiResponse({
      status: 400,
      type: BadRequestResponse,
      description: `Could not find ${entityName}, bad request`,
    }),
  );
};
