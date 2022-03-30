import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterModule } from '../character/user.module';
import { CharacterTechnique } from './entities/character-technique.entity';
import { CharacterTechniqueHttpController } from './http/character-technique.http.controller';
import { CharacterTechniqueHttpService } from './http/character-technique.http.service';

@Module({
  imports: [TypeOrmModule.forFeature([CharacterTechnique]), CharacterModule],
  controllers: [CharacterTechniqueHttpController],
  providers: [CharacterTechniqueHttpService],
  exports: [CharacterTechniqueHttpService],
})
export class CharacterTechniqueModule {}
