import { IsString } from 'class-validator';
import { IsRequired } from '~/utils/swagger-validator/is-required.decorator';
export class CreateHabilityDto {
  @IsString()
  @IsRequired()
  name: string;
}
