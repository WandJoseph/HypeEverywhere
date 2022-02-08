import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SystemModule } from './system/system.module';
import { ScenarioModule } from './scenario/scenario.module';
import { DiscordModule } from './discord/discord.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    SystemModule,
    ScenarioModule,
    DiscordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      prefix: process.env.DISCORD_PREFIX,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
