import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BadRequestResponse {
  @ApiPropertyOptional({
    description:
      'VALIDATION ERROR: A array of error messages for each field with errors',
    example: JSON.stringify({ name: ['Name must be a string'] }, null, 2),
  })
  errors: {
    [key: string]: string[];
  };
  @ApiProperty({ default: 400 })
  statusCode: number;
  @ApiProperty({ default: 'Bad Request' })
  error: string;
  @ApiProperty({ default: "Entity 'x' already exists" })
  message: string;
}
