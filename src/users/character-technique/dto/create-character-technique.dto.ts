import { IsEnum, IsNumber, IsString, Length } from 'class-validator';
import { Proficiency } from '~/system/techniques/technique/utils/technique.utils';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class CreateCharacterTechniqueDto {
  @IsNumber()
  @IsRequired()
  techniqueId: number;

  @IsEnum(Proficiency)
  @IsNotRequired()
  proficiency: number;
}
