import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';
import { NestedInTechniqueDto } from '../../technique/dto/nested-in-technique.dto';

export class FindOneTechniqueCategoryParams extends NestedInTechniqueDto {
  @IsRequired()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}
