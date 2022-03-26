import { Module } from '@nestjs/common';
import { DiscordTechniqueModule } from './discord-technique/techniques-discord.module';
import { TechniqueCategoryModule } from './technique-category/technique-category.module';
import { TechniqueEffectModule } from './technique-effect/technique-effect.module';
import { TechniqueModule } from './technique/technique.module';

@Module({
  imports: [
    DiscordTechniqueModule,
    TechniqueModule,
    TechniqueCategoryModule,
    TechniqueEffectModule,
  ],
})
export class TechniquesModule {}
