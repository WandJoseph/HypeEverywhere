import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeDiscordController } from './discord/attribute-discord.controller';
import { AttributeDiscordService } from './discord/attribute-discord.service';
import { Attribute } from './entities/attribute.entity';
import { AttributeHttpController } from './http/attribute.http.controller';
import { AttributeHttpService } from './http/attribute.http.service';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  controllers: [AttributeDiscordController, AttributeHttpController],
  providers: [AttributeDiscordService, AttributeHttpService],
  exports: [AttributeDiscordService, AttributeHttpService],
})
export class AttributeModule {}
