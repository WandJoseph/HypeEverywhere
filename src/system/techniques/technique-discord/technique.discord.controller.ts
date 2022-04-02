import { Controller, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TextChannel, User } from 'discord.js';
import { DicesDiscordService } from '~/dices/discord/dices-discord.service';
import { DiscordController, Command, Args, Author, Channel } from '~/discord';
import { onMessageErrorHandler } from '~/discord/discord.utils';
import { CharacterDiscordService } from '~/users/character-discord/character.discord.service';
import { toUniqueString } from '~/utils';
import { BaseCrudContext } from '~/utils/crud';
import { AppEventEmitter, Event } from '~/utils/events';
import { TechniqueDiscordService } from './technique.discord.service';

@DiscordController({
  collection: 't',
})
@Controller()
export class TechniqueDiscordController {
  constructor(
    private readonly service: TechniqueDiscordService,
    private readonly characterService: CharacterDiscordService,
    private readonly dicesSerivce: DicesDiscordService,
    @Inject(EventEmitter2)
    private readonly event: AppEventEmitter,
  ) {}

  @Command({
    name: '',
    description: 'Mostrar descrição de uma técnica',
  })
  async findOne(
    @Channel() channel: TextChannel,
    @Args() args: string[],
    @Author() author: User,
  ) {
    const name = args.join(' ');
    const uniqueName = toUniqueString(name);
    const id = args.join(' ');

    const msg = await channel.send(`Buscando a Técnica '${name}'`);
    const ctx: BaseCrudContext = {
      options: {
        where: [{ uniqueName }, { id }],
      },
    };
    const technique = await this.service.findOneOrFail(
      ctx,
      `Não foi possível encontrar a técnica '${name}'`,
    );
    await this.service.getCategories(technique);
    await this.service.getEffects(technique);
    const embeds = technique.toDiscordEmbeds();
    const { actionRow, keys } = this.service.getEffectsActions(technique);
    if (actionRow.components.length === 0) {
      return await msg.edit({
        content: `${author}`,
        embeds,
      });
    }
    await msg.edit({
      content: `${author}`,
      embeds,
      components: [actionRow],
    });
    const collector = msg.createMessageComponentCollector({
      filter: (btn) => keys.includes(btn.customId),
    });
    collector.on('collect', async (it) => {
      if (it.user.id !== author.id) return;
      const effect = technique.effects.find(
        (e) => e.uniqueName === it.customId,
      );
      const embed = effect.toDiscordEmbeds();
      // RESOLVER O NH DA HABILIDADE
      await msg.edit({
        content: `${author} utilizou a técnica ${effect.name}`,
        embeds: [...embed],
        components: [],
      });
      const character = await this.characterService.findOneOrFail({
        id: 2,
      });
      await this.characterService.getAttributes(character);
      this.event.emit(Event.WAND_DICE_ROLLED, {
        args: effect.nh.split(' '),
        author,
        channel,
        characterAttributes: character.attributes,
        technique,
      });
      collector.stop();
    });
  }
}
