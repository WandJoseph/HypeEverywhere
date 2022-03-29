import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeModule } from '~/system/attributes/attribute/attribute.module';
import { CharacterModule } from '../character/user.module';
import { CharacterAttributeService } from './character-attribute.service';
import { CharacterAttribute } from './entities/character-attribute.entity';
import { CharacterAttributeHttpController } from './http/character-attribute.http.controller';
import { CharacterAttributeHttpService } from './http/character.attribuite.http.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CharacterAttribute]),
    CharacterModule,
    AttributeModule,
  ],
  controllers: [CharacterAttributeHttpController],
  providers: [CharacterAttributeService, CharacterAttributeHttpService],
  exports: [CharacterAttributeService, CharacterAttributeHttpService],
})
export class CharacterAttributeModule {}
