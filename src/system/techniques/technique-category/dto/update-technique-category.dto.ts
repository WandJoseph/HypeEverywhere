import { PartialType } from '@nestjs/swagger';
import { CreateTechniqueCategoryDto } from './create-technique-category.dto';

export class UpdateCategoryTechniqueDto extends PartialType(
  CreateTechniqueCategoryDto,
) {}
