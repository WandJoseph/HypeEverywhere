import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IsNotRequired } from '../../validator/swagger-decorators/is-not-required.decorator';

export class FindAllQuery {
  @IsNumber()
  @IsNotRequired()
  @Transform(({ value }) => +value)
  take?: number;
  @IsNumber()
  @IsNotRequired()
  @Transform(({ value }) => +value)
  skip?: number;
}

export class FindAllResult<Entity> {
  data: Entity[];
  count: number;
}
