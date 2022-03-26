import { IsNumber, IsString, Length } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class CreateCharacterAttributeDto {
  @IsNumber()
  @IsRequired()
  characterId: number;

  @IsNumber()
  @IsRequired()
  attributeId: number;
}
