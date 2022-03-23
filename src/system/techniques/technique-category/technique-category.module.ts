import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniqueModule } from '../technique/technique.module';
import { CategoryDiscordController } from './discord/category.discord.controller';
import { CategoryDiscordService } from './discord/category.discord.service';
import { Category } from './entities/category.entity';
import { TechniqueCategory } from './entities/technique-category.entity';
import { CategoryHttpController } from './http/category.http.controller';
import { CategoryHttpService } from './http/category.http.service';
import { TechniqueCategoryHttpController } from './http/technique-category.http.controller';
import { TechniqueCategoryHttpService } from './http/technique-category.http.service';

@Module({
  imports: [
    TechniqueModule,
    TypeOrmModule.forFeature([Category, TechniqueCategory]),
  ],
  controllers: [
    CategoryHttpController,
    CategoryDiscordController,
    TechniqueCategoryHttpController,
  ],
  providers: [
    CategoryHttpService,
    CategoryDiscordService,
    TechniqueCategoryHttpService,
  ],
  exports: [CategoryHttpService, TechniqueCategoryHttpService],
})
export class TechniqueCategoryModule {}
