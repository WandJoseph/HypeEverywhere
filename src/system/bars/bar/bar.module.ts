import { Module } from '@nestjs/common';
import { BarHttpController } from './http/bar.http.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bar } from './entities/bar.entity';
import { BarHttpService } from './http/bar.http.service';
import { BarDiscordController } from './discord/bar.discord.controller';
import { BarDiscordService } from './discord/bar.discord.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bar])],
  controllers: [BarHttpController, BarDiscordController],
  providers: [BarHttpService, BarDiscordService],
})
export class BarModule {}
