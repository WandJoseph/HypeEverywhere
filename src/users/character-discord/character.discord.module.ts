import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeModule } from '~/system/attributes/attribute/attribute.module';
import { CharacterAttributeModule } from '~/users/character-attribute/character-attribute.module';
import { Character } from '~/users/character/entities/character.entity';
import { CharacterDiscordController } from './character.discord.controller';
import { CharacterDiscordService } from './character.discord.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    AttributeModule,
    CharacterAttributeModule,
  ],
  controllers: [CharacterDiscordController],
  providers: [CharacterDiscordService],
  exports: [CharacterDiscordService],
})
export class CharacterDiscordModule {}
