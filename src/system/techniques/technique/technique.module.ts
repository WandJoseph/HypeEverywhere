import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniqueHttpController } from './http/technique.http.controller';
import { TechniqueHttpService } from './http/technique.http.service';
import { Technique } from './entities/technique.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technique])],
  controllers: [TechniqueHttpController],
  providers: [TechniqueHttpService],
  exports: [TechniqueHttpService],
})
export class TechniqueModule {}
