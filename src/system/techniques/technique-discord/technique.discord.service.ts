import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageActionRow, MessageButton } from 'discord.js';
import { Repository } from 'typeorm';
import { BaseCrudContext } from '~/utils/crud';
import { DiscordCrudService } from '~/utils/crud/discord-crud.service';
import { CategoryHttpService } from '../technique-category/http/category.http.service';
import { TechniqueCategoryHttpService } from '../technique-category/http/technique-category.http.service';
import { TechniqueEffectHttpService } from '../technique-effect/http/technique-effect.http.service';
import { Technique } from '../technique/entities/technique.entity';

@Injectable()
export class TechniqueDiscordService extends DiscordCrudService<Technique> {
  constructor(
    @InjectRepository(Technique)
    private readonly repo: Repository<Technique>,
    private readonly techniqueCategoryService: TechniqueCategoryHttpService,
    private readonly techniqueEffectService: TechniqueEffectHttpService,
    private readonly categoryService: CategoryHttpService,
  ) {
    super(repo);
  }

  getEffectsActions({ effects }: Technique): {
    actionRow: MessageActionRow;
    keys: string[];
  } {
    const actionRow = new MessageActionRow();

    const effectsKey: string[] = [];
    actionRow.addComponents(
      effects.map((e) => {
        const btn = new MessageButton();
        btn.setStyle('PRIMARY');
        btn.setLabel(e.name);
        btn.setCustomId(e.uniqueName);
        effectsKey.push(e.uniqueName);
        return btn;
      }),
    );
    return {
      actionRow,
      keys: effectsKey,
    };
  }
  async getCategories(technique: Technique) {
    const techniqueCategories = await this.techniqueCategoryService.findAll({
      params: { techniqueId: technique.id },
    });
    const categoryIds = techniqueCategories.data.map((tc) => ({
      id: tc.categoryId,
    }));
    const result = await this.categoryService.findAll({
      options: {
        where: categoryIds,
      },
      query: {
        take: 50,
      },
    });
    const categoryNames = result.data.map((c) => c.name);
    technique.categories = categoryNames;
  }
  async getEffects(technique: Technique) {
    const { data: effects } = await this.techniqueEffectService.findAll({
      params: { techniqueId: technique.id },
      options: { where: { techniqueId: technique.id } },
      query: {
        take: 50,
      },
    });
    technique.effects = effects;
  }
}
