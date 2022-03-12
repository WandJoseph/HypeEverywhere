import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  BaseCrudContext,
  DeleteRoute,
  FindAllRoute,
  FindOneIdStringParams,
  FindOneRoute,
  UpdateRoute,
} from '~/utils/crud';
import { CreateRoute } from '~/utils/crud/decorators/create-route.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserHttpService } from './user.http.service';

@ApiTags('User')
@Controller({
  version: '1',
  path: 'user',
})
export class UserHttpController {
  constructor(private readonly service: UserHttpService) {}

  // @CreateRoute({
  //   type: User,
  // })
  // async create(@Body() dto: CreateUserDto) {
  //   const ctx: BaseCrudContext = {
  //     dto,
  //   };
  //   return await this.service.create(ctx);
  // }
  @UpdateRoute({
    type: User,
  })
  update(@Param() params: FindOneIdStringParams, @Body() dto: UpdateUserDto) {
    const ctx: BaseCrudContext = {
      id: params.id,
      dto,
    };
    return this.service.update(ctx);
  }
  @DeleteRoute({
    type: User,
  })
  delete(@Param() params: FindOneIdStringParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.delete(ctx);
  }
  @FindOneRoute({
    type: User,
  })
  findOne(@Param() params: FindOneIdStringParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
    };
    return this.service.findOne(ctx);
  }
  @FindAllRoute({
    type: User,
  })
  findAll() {
    const ctx: BaseCrudContext = {};
    return this.service.findAll(ctx);
  }
}
