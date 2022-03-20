import { Module } from '@nestjs/common';
import { BarHttpController } from './http/bar.http.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bar } from './entities/bar.entity';
import { BarHttpService } from './http/bar.http.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bar])],
  controllers: [BarHttpController],
  providers: [BarHttpService],
})
export class BarModule {}
