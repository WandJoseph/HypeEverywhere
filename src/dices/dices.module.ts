import { Module } from '@nestjs/common';
import { DicesDiscordController } from './discord/dices-discord.controller';
import { DicesDiscordService } from './discord/dices-discord.service';
@Module({
  controllers: [DicesDiscordController],
  providers: [DicesDiscordService],
  exports: [DicesDiscordService],
})
export class DicesModule {}
