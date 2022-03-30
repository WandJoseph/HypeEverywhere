import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CharacterDiscordModule } from '../character-discord/character.discord.module';
import { Character } from '../character/entities/character.entity';
import { UserModule } from '../user/user.module';
import { UserCharacterDiscordController } from './discord/user-character.discord.controller';
import { UserCharacterDiscordService } from './discord/user-character.discord.service';
import { UserCharacterHttpController } from './http/user-character.http.controller';
import { UserCharacterHttpService } from './http/user-character.http.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character]),
    UserModule,
    CharacterDiscordModule,
  ],
  controllers: [UserCharacterHttpController, UserCharacterDiscordController],
  providers: [UserCharacterHttpService, UserCharacterDiscordService],
})
export class UserCharacterModule {}
