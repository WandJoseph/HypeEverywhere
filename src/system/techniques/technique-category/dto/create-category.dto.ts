import { IsEnum, IsString } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class CreateCategoryDto {
  @IsRequired()
  @IsString()
  name: string;

  @IsNotRequired()
  @IsString()
  description?: string;
}
