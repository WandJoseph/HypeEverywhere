import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { CharacterHttpController } from './http/character.http.controller';
import { CharacterHttpService } from './http/character.http.service';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [CharacterHttpService],
  controllers: [CharacterHttpController],
  exports: [CharacterHttpService],
})
export class CharacterModule {}
