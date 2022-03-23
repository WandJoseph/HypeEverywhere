import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniqueModule } from '../technique/technique.module';
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
  controllers: [CategoryHttpController, TechniqueCategoryHttpController],
  providers: [CategoryHttpService, TechniqueCategoryHttpService],
})
export class TechniqueCategoryModule {}
