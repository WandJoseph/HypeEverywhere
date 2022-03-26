import { Module } from '@nestjs/common';
import { AttributesModule } from './attributes/attributes.module';
import { TechniquesModule } from './techniques/techniques.module';

@Module({
  imports: [AttributesModule, TechniquesModule],
})
export class SystemModule {}
