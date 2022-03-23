import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCrudContext } from '~/utils/crud';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { CategoryHttpService } from '../technique-category/http/category.http.service';
import { TechniqueCategoryHttpService } from '../technique-category/http/technique-category.http.service';
import { Technique } from '../technique/entities/technique.entity';

@Injectable()
export class TechniqueDiscordService extends DiscordCrudService<Technique> {
  constructor(
    @InjectRepository(Technique)
    private readonly repo: Repository<Technique>,
    private readonly techniqueCategoryService: TechniqueCategoryHttpService,
    private readonly categoryService: CategoryHttpService,
  ) {
    super(repo);
  }

  async getCategories(technique: Technique) {
    const ctx: BaseCrudContext = {
      params: { techniqueId: technique.id },
    };
    const techniqueCategories = await this.techniqueCategoryService.findAll(
      ctx,
    );
    const categories: string[] = [];
    for (const { categoryId: id } of techniqueCategories.data) {
      const category = await this.categoryService.findOne({
        id,
      });
      category && categories.push(category.name);
    }
    technique.categories = categories;
  }
}
