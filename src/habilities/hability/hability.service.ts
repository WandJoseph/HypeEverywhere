import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from 'src/utils/crud/base-crud.service';
import { Repository } from 'typeorm/repository/Repository';
import { BaseCrudContext } from '~/utils/crud/base-crud-context.interface';
import { Before } from '~/utils/crud/base-crud.decorator';
import { CreateHabilityDto } from './dto/create-hability.dto';
import { Hability } from './entities/hability.entity';

@Injectable()
export class HabilityService extends BaseCrudService<Hability> {
  constructor(@InjectRepository(Hability) repo: Repository<Hability>) {
    super(repo);
  }
  @Before('create')
  createUniqueName(ctx: BaseCrudContext) {
    const dto: CreateHabilityDto = ctx.createDto;
    const uniqueName = dto.name.toLocaleLowerCase().replace(' ', '_');
    ctx.createDto = dto;
    ctx.createDto.uniqueName = uniqueName;
    return ctx;
  }
}
