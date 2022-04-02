import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsEnum, IsString, IsUrl } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { CreateCharacterDto } from './create-character.dto';
import { Element } from '../entities/character.entity';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
  @IsNotRequired()
  @IsString()
  name: string;

  @IsNotRequired()
  @IsString()
  avatar: string;

  @IsNotRequired()
  @IsString({
    each: true,
  })
  @IsUrl()
  @IsArray()
  images: string[];

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
  @IsArray()
  @IsString({
    each: true,
  })
  languages: string[];

  @IsNotRequired()
  @IsString()
  personality: string;
}
