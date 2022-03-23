import { IsEnum, IsString } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';
import { TechniqueProficiency } from '../entities/technique.entity';

export class CreateTechniqueDto {
  @IsRequired()
  @IsString()
  name: string;

  @IsRequired()
  @IsString()
  description: string;

  @IsNotRequired()
  @IsEnum(TechniqueProficiency)
  proficiencyLimit: TechniqueProficiency;
}
