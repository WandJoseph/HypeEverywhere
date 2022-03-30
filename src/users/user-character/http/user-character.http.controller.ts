import { Controller, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Character } from '~/users/character/entities/character.entity';
import {
  NestedInUserParams,
  NestedInUserFindOneParams,
} from '~/users/user/dto/nested-in-user.params';
import {
  CreateRoute,
  BaseCrudContext,
  UpdateRoute,
  DeleteRoute,
  FindOneRoute,
  FindAllRoute,
  FindAllQuery,
} from '~/utils/crud';
import { UserCharacterHttpService } from './user-character.http.service';

@Controller('user/:userId/character')
@ApiTags('User Characters')
export class UserCharacterHttpController {
  constructor(private readonly service: UserCharacterHttpService) {}
  // @CreateRoute({
  //   type: Character,
  // })
  // async create(
  //   @Param() params: NestedInUserParams,
  //   @Body() dto: CreateUserCharacterDto,
  // ) {
  //   const ctx: BaseCrudContext = {
  //     dto,
  //     params,
  //   };
  //   return await this.service.create(ctx);
  // }

  // @UpdateRoute({
  //   type: Character,
  // })
  // update(
  //   @Param() params: NestedInUserFindOneParams,
  //   @Body() dto: UpdateUserCharacterDto,
  // ) {
  //   const ctx: BaseCrudContext = {
  //     id: params.id,
  //     params,
  //     dto,
  //   };
  //   return this.service.update(ctx);
  // }

  @DeleteRoute({
    type: Character,
  })
  delete(@Param() params: NestedInUserFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.delete(ctx);
  }

  @FindOneRoute({
    type: Character,
  })
  findOne(@Param() params: NestedInUserFindOneParams) {
    const ctx: BaseCrudContext = {
      id: params.id,
      params,
    };
    return this.service.findOne(ctx);
  }

  @FindAllRoute({
    type: Character,
  })
  findAll(@Param() params: NestedInUserParams, @Query() query: FindAllQuery) {
    const ctx: BaseCrudContext = {
      query,
      params,
      options: {
        where: {
          userId: params.userId,
        },
      },
    };
    return this.service.findAll(ctx);
  }
}
