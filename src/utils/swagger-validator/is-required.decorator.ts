import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export const IsRequired = () => applyDecorators(IsNotEmpty(), ApiProperty());
