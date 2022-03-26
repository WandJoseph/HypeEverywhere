import { Module } from '@nestjs/common';
import { AttributeModule } from './attribute/attribute.module';

@Module({
  imports: [AttributeModule],
})
export class AttributesModule {}
