import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDiscordController } from './discord/user.discord.controller';
import { UserDiscordService } from './discord/user.discord.service';
import { UserHttpController } from './http/user.http.controller';
import { UserHttpService } from './http/user.http.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserDiscordService, UserHttpService],
  controllers: [UserDiscordController, UserHttpController],
})
export class UserModule {}
