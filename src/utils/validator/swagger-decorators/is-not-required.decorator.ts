import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export const IsNotRequired = (options?: ApiPropertyOptions) =>
  applyDecorators(IsOptional(), ApiPropertyOptional(options));
