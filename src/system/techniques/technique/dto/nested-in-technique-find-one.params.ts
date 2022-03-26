import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';
import { NestedInTechniqueParams } from './nested-in-technique.params';

export class NestedInTechniqueFindOneParams extends NestedInTechniqueParams {
  @IsRequired()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}
