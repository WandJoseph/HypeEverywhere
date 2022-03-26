import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechniqueModule } from '../technique/technique.module';
import { Effect } from './entities/effect.entity';
import { TechniqueEffectHttpController } from './http/technique-effect.http.controller';
import { TechniqueEffectHttpService } from './http/technique-effect.http.service';

@Module({
  imports: [TypeOrmModule.forFeature([Effect]), TechniqueModule],
  controllers: [TechniqueEffectHttpController],
  providers: [TechniqueEffectHttpService],
  exports: [TechniqueEffectHttpService],
})
export class TechniqueEffectModule {}
