import { Module } from '@nestjs/common';
import { TechniqueDiscordModule } from './technique-discord/technique-discord.module';
import { TechniqueCategoryModule } from './technique-category/technique-category.module';
import { TechniqueEffectModule } from './technique-effect/technique-effect.module';
import { TechniqueModule } from './technique/technique.module';

@Module({
  imports: [
    TechniqueDiscordModule,
    TechniqueModule,
    TechniqueCategoryModule,
    TechniqueEffectModule,
  ],
})
export class TechniquesModule {}
