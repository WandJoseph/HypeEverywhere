import { ApiProperty } from '@nestjs/swagger';

export class EntityDeletedResponse {
  @ApiProperty()
  raw: [];
  @ApiProperty()
  affected: number;
}
