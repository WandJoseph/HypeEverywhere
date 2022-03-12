import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class FindOneParams {
  @IsNumber()
  @IsRequired()
  @Transform(({ value }) => +value)
  id: number;
}
export class FindOneIdStringParams {
  @IsString()
  @IsRequired()
  id: string;
}
