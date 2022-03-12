import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { CreateUserDto } from './create-user.dto';
import { Element } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['id']),
) {
  @IsNotRequired()
  @IsString()
  name: string;

  @IsNotRequired()
  @IsString()
  quote: string;

  @IsNotRequired()
  @IsString()
  nationality: string;

  @IsNotRequired()
  @IsString()
  genre: string;

  @IsNotRequired()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  birthDate: Date;

  @IsNotRequired()
  @IsEnum(Element)
  element: Element;

  @IsNotRequired()
  @IsString()
  languages: string[];

  @IsNotRequired()
  @IsString()
  personality: string;
}
