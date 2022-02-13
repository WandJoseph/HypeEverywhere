import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeDiscordController } from './attribute-discord.controller';
import { AttributeDiscordService } from './attribute-discord.service';
import { AttributeController } from './attribute.controller';
import { AttributeService } from './attribute.service';
import { Attribute } from './entities/attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  controllers: [AttributeDiscordController, AttributeController],
  providers: [AttributeDiscordService, AttributeService],
})
export class AttributesModule {}
