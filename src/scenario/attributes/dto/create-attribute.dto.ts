import { IsString } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class CreateAttributeDto {
  @IsRequired()
  @IsString()
  name: string;

  @IsRequired()
  @IsString()
  resume: string;

  @IsNotRequired()
  @IsString()
  description?: string;
}
