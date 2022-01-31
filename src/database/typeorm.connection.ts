import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const typeormConnection = (): TypeOrmModuleOptions => ({
  type: process.env.DB_DRIVE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
  synchronize: true,
});
