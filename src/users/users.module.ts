import { Module } from '@nestjs/common';
import { CharacterAttributeModule } from './character-attribute/character-attribute.module';
import { CharacterModule } from './character/user.module';
import { ConditionsModule } from './conditions/conditions.module';

@Module({
  imports: [CharacterModule, CharacterAttributeModule, ConditionsModule],
})
export class UsersModule {}
