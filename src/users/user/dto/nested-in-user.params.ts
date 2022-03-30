import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class NestedInUserParams {
  @IsRequired()
  @IsString()
  userId: string;
}

export class NestedInUserFindOneParams extends NestedInUserParams {
  @IsRequired()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}
