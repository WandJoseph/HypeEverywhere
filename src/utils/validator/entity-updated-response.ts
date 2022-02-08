import { ApiProperty } from '@nestjs/swagger';

export class EntityUpdatedResponse {
  @ApiProperty()
  generatedMaps: [];
  @ApiProperty()
  raw: [];
  @ApiProperty()
  affected: number;
}
