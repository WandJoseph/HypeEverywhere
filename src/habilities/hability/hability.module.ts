import { Module } from '@nestjs/common';
import { HabilityService } from './hability.service';
import { HabilityController } from './hability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hability } from './entities/hability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hability])],
  controllers: [HabilityController],
  providers: [HabilityService],
})
export class HabilityModule {}
