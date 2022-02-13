import { ApiProperty } from '@nestjs/swagger';

export class FindAllResponse {
  @ApiProperty({
    description: 'The list of entities',
  })
  data: any[];

  @ApiProperty({
    description: 'The total number of entities',
  })
  count: number;
}
