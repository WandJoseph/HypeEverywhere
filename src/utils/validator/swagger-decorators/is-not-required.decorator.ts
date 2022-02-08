import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export const IsNotRequired = () =>
  applyDecorators(IsOptional(), ApiPropertyOptional());
