import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class NestedInTechniqueParams {
  @IsRequired()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  techniqueId: number;
}
