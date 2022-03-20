import { BaseFactory } from '~/utils/tests/base.factory';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { Attribute } from './entities/attribute.entity';

export class AttributeFactory extends BaseFactory<Attribute> {
  dto(data?: Partial<CreateAttributeDto>): CreateAttributeDto {
    const { casual } = this;
    return {
      name: casual.name,
      resume: casual.title,
      // description: casual.description,
      shortName: casual.letter + casual.letter + casual.letter,
      ...data,
    };
  }
}
