import { IsString } from 'class-validator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class CreateUserDto {
  @IsString()
  @IsRequired()
  id: string;
}
