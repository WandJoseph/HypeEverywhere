import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { HabilitiesModule } from './habilities/habilities.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, HabilitiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
