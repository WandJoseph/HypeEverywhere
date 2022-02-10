import { evaluate } from 'mathjs';
import { Dice } from './dice.entitiy';
import { Roll } from './roll.entity';

export type MathOperator = '+' | '-';
export type LogicOperator = '<' | '>';

export class StorytellerRoll extends Roll {
  private leftRolls: Array<Dice | MathOperator> = [];
  private rightRolls: Array<number | Dice | MathOperator> = [];
  private onRight = false;
  private comparator: LogicOperator;
  private difficulty: number;

  public expression: string;
  public mathExpression: string;
  public total: number | boolean;
  isNumber(value: string): boolean {
    const digits_only = (string) =>
      [...string].every((c) => '0123456789-+'.includes(c));
    return digits_only(value);
  }
  isDice(value: string) {
    const rolls: string[] = value.split('d');
    if (rolls.length !== 2) return false;
    if (!this.isNumber(rolls[0]) || !this.isNumber(rolls[1])) return false;
    return true;
  }
  isMathOperator(value: string) {
    return value === '+' || value === '-';
  }
  isLogicOperator(value: string) {
    return value === '>' || value === '<';
  }

  pushRoll(value: number | Dice | MathOperator) {
    this.onRight
      ? this.rightRolls.push(value)
      : this.leftRolls.push(value as Dice);
  }

  orderRolls(...args: any[]) {
    this.leftRolls = [];
    this.rightRolls = [];
    let format = args.join(' ').split(/(\+)/);
    format = format.join(' ').split(/(-)/);
    format = format.join(' ').split(/(<)/);
    format = format.join(' ').split(/(>)/);
    args = format.join(' ').split(' ');
    for (let i = 0; i < args.length; i++) {
      const value = args[i];
      if (value === '') continue;
      if (this.isLogicOperator(value)) {
        this.onRight = true;
        this.comparator = value;
      } else if (this.isMathOperator(value)) {
        this.pushRoll(value);
      } else if (this.isNumber(value)) {
        if (!this.onRight) {
          throw new Error(
            'A esquerda da dificuldade deve conter apenas dados!' +
              ', Valor: ' +
              value,
          );
        }
        this.pushRoll(value);
      } else if (this.isDice(value)) {
        const dice = new Dice(+value.split('d')[0], +value.split('d')[1]);
        this.pushRoll(dice);
      } else {
        throw new Error(`Invalid roll: ${value}`);
      }
    }
  }
  setDifficulty() {
    const mathExpression = this.getMathExpression(this.rightRolls);
    this.difficulty = evaluate(mathExpression);
    return this.difficulty;
  }

  finalRoll() {
    this.setDifficulty();
    this.expression = '';
    this.mathExpression = '';
    this.total = 0;

    const dices = this.leftRolls;
    for (const dice of dices) {
      if (typeof dice === 'string') {
        this.expression += dice;
        this.mathExpression += dice;
        continue;
      }

      this.expression += `${dice.quantity}d${dice.faces}: [`;
      const rolls: string[] = [];
      let success = 0;
      dice.rolls.forEach((roll) => {
        const comparation = evaluate(
          `${roll} ${this.comparator}= ${this.difficulty}`,
        );
        success += comparation ? 1 : 0;
        rolls.push(comparation ? `__${roll}__` : `${roll}`);
      });
      this.total += success;
      this.expression += rolls.join(', ');
      this.expression += ']\n';
      this.mathExpression += `${dice.quantity}d${dice.faces}: [${success}]`;
    }
  }

  constructor(...args: any[]) {
    super(...args);
    this.orderRolls(...args);
    this.finalRoll();
  }
}
