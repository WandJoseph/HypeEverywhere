import { Module } from '@nestjs/common';
import { AttributesModule } from './attributes/attributes.module';
import { BarModule } from './bars/bars.module';

@Module({
  imports: [AttributesModule, BarModule],
})
export class ScenarioModule {}
