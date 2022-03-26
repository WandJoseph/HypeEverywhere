import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class NestedInCharacterParams {
  @IsRequired()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  characterId: number;
}

export class NestedInCharacterFindOneParams extends NestedInCharacterParams {
  @IsRequired()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}
