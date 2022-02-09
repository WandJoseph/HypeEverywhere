import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDiscordController } from './discord/user-discord.controller';
import { UserDiscordService } from './discord/user-discord.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserDiscordService],
  controllers: [UserDiscordController],
})
export class UserModule {}
