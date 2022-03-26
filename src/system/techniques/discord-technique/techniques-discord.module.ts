import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniqueCategoryModule } from '../technique-category/technique-category.module';
import { TechniqueEffectModule } from '../technique-effect/technique-effect.module';
import { Technique } from '../technique/entities/technique.entity';
import { TechniqueModule } from '../technique/technique.module';
import { TechniqueDiscordController } from './technique.discord.controller';
import { TechniqueDiscordService } from './technique.discord.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Technique]),
    TechniqueModule,
    TechniqueCategoryModule,
    TechniqueEffectModule,
  ],
  controllers: [TechniqueDiscordController],
  providers: [TechniqueDiscordService],
})
export class DiscordTechniqueModule {}
