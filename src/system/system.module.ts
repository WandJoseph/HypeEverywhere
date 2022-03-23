import { Module } from '@nestjs/common';
import { TechniquesModule } from './techniques/techniques.module';

@Module({
  imports: [TechniquesModule],
})
export class SystemModule {}
