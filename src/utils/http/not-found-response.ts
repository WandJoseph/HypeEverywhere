import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  statusCode: number;
  message: "Entity 'id' not found";
  error: 'Not Found';
}
