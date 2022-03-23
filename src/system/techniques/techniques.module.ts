import { Module } from '@nestjs/common';
import { DiscordTechniqueModule } from './discord-technique/techniques-discord.module';
import { TechniqueCategoryModule } from './technique-category/technique-category.module';
import { TechniqueModule } from './technique/technique.module';

@Module({
  imports: [DiscordTechniqueModule, TechniqueModule, TechniqueCategoryModule],
})
export class TechniquesModule {}
