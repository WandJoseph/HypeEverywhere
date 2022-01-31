import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export const IsNotRequired = () => applyDecorators(IsOptional(), ApiProperty());
