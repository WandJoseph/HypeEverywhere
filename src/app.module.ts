import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SystemModule } from './system/system.module';
import { UsersModule } from './users/users.module';
import { DicesModule } from './dices/dices.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    DatabaseModule,
    SystemModule,
    UsersModule,
    DicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
