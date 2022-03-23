import { Module } from '@nestjs/common';
import { TechniqueCategoryModule } from './technique-category/technique-category.module';
import { TechniqueModule } from './technique/technique.module';

@Module({
  imports: [TechniqueModule, TechniqueCategoryModule],
})
export class TechniquesModule {}
