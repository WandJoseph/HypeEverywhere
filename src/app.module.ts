import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SystemModule } from './system/system.module';
import { ScenarioModule } from './scenario/scenario.module';
import { UsersModule } from './users/users.module';
import { DicesModule } from './dices/dices.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    SystemModule,
    ScenarioModule,
    UsersModule,
    DicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
