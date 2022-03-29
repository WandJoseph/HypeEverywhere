import { Module } from '@nestjs/common';
import { CharacterDiscordModule } from '../character-discord/character.discord.module';
import { UserModule } from '../user/user.module';
import { UserCharacterDiscordController } from './discord/user-character.discord.controller';
import { UserCharacterDiscordService } from './discord/user-character.discord.service';

@Module({
  imports: [UserModule, CharacterDiscordModule],
  controllers: [UserCharacterDiscordController],
  providers: [UserCharacterDiscordService],
})
export class UserCharacterModule {}
