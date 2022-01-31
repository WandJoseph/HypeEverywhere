import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HabilityService } from './hability.service';
import { CreateHabilityDto } from './dto/create-hability.dto';
import { UpdateHabilityDto } from './dto/update-hability.dto';
import { BaseCrudContext } from 'src/utils/crud/base-crud-context.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hability')
@Controller('hability')
export class HabilityController {
  constructor(private readonly habilityService: HabilityService) {}

  @Post()
  create(@Body() createDto: CreateHabilityDto) {
    const ctx: BaseCrudContext = { createDto };
    return this.habilityService.create(ctx);
  }
}
