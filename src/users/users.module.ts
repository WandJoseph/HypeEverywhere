import { Module } from '@nestjs/common';
import { CharacterAttributeModule } from './character-attribute/character-attribute.module';
import { CharacterDiscordModule } from './character-discord/character.discord.module';
import { CharacterTechniqueModule } from './character-technique/character-technique.module';
import { CharacterModule } from './character/user.module';
import { UserCharacterModule } from './user-character/user-character.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CharacterModule,
    CharacterAttributeModule,
    CharacterDiscordModule,
    CharacterTechniqueModule,
    UserModule,
    UserCharacterModule,
  ],
})
export class UsersModule {}
