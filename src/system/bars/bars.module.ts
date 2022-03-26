import { Module } from '@nestjs/common';
import { BarModule } from './bar/bar.module';

@Module({
  imports: [BarModule],
})
export class BarsModule {}
