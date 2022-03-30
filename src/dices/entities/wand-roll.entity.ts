import { ColorResolvable, EmbedField, MessageEmbed } from 'discord.js';
import { Roll } from './roll.entity';

enum WandRollResult {
  SUCCESS = 'success',
  FAIL = 'fail',
  CRITIC_FAIL = 'criticFail',
  CRITIC_SUCCESS = 'criticSuccess',
}
export const WandRollResultColors: {
  [key in WandRollResult]: ColorResolvable;
} = {
  [WandRollResult.CRITIC_SUCCESS]: '#ffa500',
  [WandRollResult.CRITIC_FAIL]: '#000000',
  [WandRollResult.SUCCESS]: '#00ff00',
  [WandRollResult.FAIL]: '#ff0000',
};
export const WandRollResultTitles: {
  [key in WandRollResult]: string;
} = {
  [WandRollResult.CRITIC_SUCCESS]: ':star: SUCESSSO CRITICO!! :star:',
  [WandRollResult.CRITIC_FAIL]:
    ':skull_crossbones: FALHA CRITICA HAHA!! :skull_crossbones:',
  [WandRollResult.SUCCESS]: 'Sucesso!',
  [WandRollResult.FAIL]: 'Falha!',
};
export class WandRoll extends Roll {
  public rollResult: WandRollResult;
  public margin: number;

  constructor(expression: string, originalExpression?: string) {
    const exprInit = '3d10 <';
    const expr = exprInit + expression;
    const origExpr = originalExpression ? exprInit + originalExpression : expr;
    super(expr, origExpr);
    this.setRollResult();
  }

  public setRollResult() {
    this.margin = this.rightTotal - this.leftTotal;
    const criticSuccess = this.leftTotal <= 5;
    const criticFail = this.leftTotal >= 27;
    this.rollResult = criticSuccess
      ? WandRollResult.CRITIC_SUCCESS
      : criticFail
      ? WandRollResult.CRITIC_FAIL
      : this.margin >= 0
      ? WandRollResult.SUCCESS
      : WandRollResult.FAIL;
  }

  toDiscordEmbeds() {
    const rollField: EmbedField = {
      name: 'Rolagem',
      value: `${this.leftTotal}`,
      inline: true,
    };

    const habilityField: EmbedField = {
      name: 'Nível de Habilidade',
      value: `${this.rightTotal}`,
      inline: true,
    };
    const totalField: EmbedField = {
      name: `Margem: ${this.margin}`,
      value: `${this.rightTotal}-${this.leftTotal} = ${this.margin}`,
      inline: false,
    };

    const embeds = new MessageEmbed({
      description: `${this.leftDiceExpr} ${this.operator} ${this.rightDiceExpr}`,
      color: WandRollResultColors[this.rollResult],
      title: WandRollResultTitles[this.rollResult],
      fields: [rollField, habilityField, totalField],
    });
    return [embeds];
  }
}
