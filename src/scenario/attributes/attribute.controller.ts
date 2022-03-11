import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BaseCrudContext,
  CreateRoute,
  DeleteRoute,
  FindAllRoute,
  FindOneParams,
  FindOneRoute,
  UpdateRoute,
} from '~/utils/crud';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './entities/attribute.entity';

@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
  constructor(private readonly service: AttributeService) {}

  @CreateRoute({
    type: Attribute,
  })
  async create(@Body() dto: CreateAttributeDto) {
    const ctx: BaseCrudContext = {
      dto,
    };
    return await this.service.create(ctx);
  }
  @UpdateRoute({
    type: Attribute,
  })
  update(@Param() params: FindOneParams, @Body() dto: UpdateAttributeDto) {
    const ctx: BaseCrudContext = {
      id: params.id,
      dto,
    };
    return this.service.update(ctx);
  }
  @DeleteRoute({
    type: Attribute,
  })
  delete(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.delete(ctx);
  }
  @FindOneRoute({
    type: Attribute,
  })
  findOne(@Param() params: FindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.findOne(ctx);
  }
  @FindAllRoute({
    type: Attribute,
  })
  findAll() {
    const ctx: BaseCrudContext = {};
    return this.service.findAll(ctx);
  }
}
