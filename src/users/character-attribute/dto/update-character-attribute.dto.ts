import { PartialType } from '@nestjs/swagger';
import { CreateCharacterAttributeDto } from './create-character-attribute.dto';

export class UpdateCharacterAttributeDto extends PartialType(
  CreateCharacterAttributeDto,
) {}
