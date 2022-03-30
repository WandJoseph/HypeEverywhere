import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCharacterTechniqueDto } from './create-character-technique.dto';

export class UpdateCharacterTechniqueDto extends PartialType(
  OmitType(CreateCharacterTechniqueDto, ['techniqueId']),
) {}
