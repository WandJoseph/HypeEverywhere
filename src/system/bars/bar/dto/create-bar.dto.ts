import { IsHexColor, IsString, Length } from 'class-validator';
import { IsNotRequired } from '~/utils/validator/swagger-decorators/is-not-required.decorator';
import { IsRequired } from '~/utils/validator/swagger-decorators/is-required.decorator';

export class CreateBarDto {
  @IsRequired()
  @IsString()
  @Length(3, 16)
  name: string;

  @IsRequired()
  @IsString()
  @IsHexColor()
  color: string;

  @IsRequired()
  @IsString()
  @Length(1, 5)
  shortName: string;

  @IsRequired()
  @IsString()
  @Length(1, 255)
  resume: string;
}
