import { IsNumber } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class CreateTechniqueCategoryDto {
  @IsRequired()
  @IsNumber()
  categoryId: number;
}
