import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniqueDiscordController } from './discord/technique.discord.controller';
import { TechniqueDiscordService } from './discord/technique.discord.service';
import { TechniqueHttpController } from './http/technique.http.controller';
import { TechniqueHttpService } from './http/technique.http.service';
import { Technique } from './entities/technique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technique])],
  controllers: [TechniqueHttpController, TechniqueDiscordController],
  providers: [TechniqueHttpService, TechniqueDiscordService],
  exports: [TechniqueHttpService, TechniqueDiscordService],
})
export class TechniqueModule {}
