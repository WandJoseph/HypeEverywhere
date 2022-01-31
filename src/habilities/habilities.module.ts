import { Module } from '@nestjs/common';
import { LevelModule } from './level/level.module';
import { HabilityModule } from './hability/hability.module';

@Module({
  imports: [LevelModule, HabilityModule],
})
export class HabilitiesModule {}
