import { IsEnum, IsString } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';
import { Proficiency } from '../utils/technique.utils';
export class CreateTechniqueDto {
  @IsRequired()
  @IsString()
  name: string;

  @IsRequired()
  @IsString()
  description: string;

  @IsNotRequired()
  @IsEnum(Proficiency)
  proficiencyLimit: Proficiency;
}
