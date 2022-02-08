import { applyDecorators, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BadRequestResponse } from '~/utils/validator/bad-request-response';

export interface CreateRouteOptions {
  path?: string;
  type: any;
}

export const CreateRoute = (options: CreateRouteOptions) => {
  const { path, type } = options;
  const entityName = type.name || 'Entity';
  return applyDecorators(
    Post(path),
    ApiResponse({
      status: 201,
      type,
      description: `${entityName} created successfully`,
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
