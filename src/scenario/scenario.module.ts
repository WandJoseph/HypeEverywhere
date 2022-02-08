import { Module } from '@nestjs/common';
import { AttributesModule } from './attributes/attributes.module';

@Module({
  imports: [AttributesModule]
})
export class ScenarioModule {}
