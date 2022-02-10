import { evaluate } from 'mathjs';
import { Dice } from './dice.entitiy';

export type MathOperator = '+' | '-' | '*' | '/';
export type LogicOperator = '<' | '>' | '<=' | '>=' | '==' | '!=';

export class Roll {
  private __rolls: Array<number | Dice | MathOperator> = [];
  public expression: string;
  public mathExpression: string;
  public total: number | boolean;
  isNumber(value: string): boolean {
    return !isNaN(+value);
  }
  isDice(value: string) {
    const rolls: string[] = value.split('d');
    if (rolls.length !== 2) return false;
    if (!this.isNumber(rolls[0]) || !this.isNumber(rolls[1])) return false;
    return true;
  }
  isMathOperator(value: string) {
    return value === '+' || value === '-' || value === '*' || value === '/';
  }

  isLogicOperator(value: string) {
    return (
      value === '<' ||
      value === '>' ||
      value === '<=' ||
      value === '>=' ||
      value === '==' ||
      value === '!='
    );
  }
  getMathExpression(rolls: Array<number | Dice | MathOperator>) {
    return rolls
      .map((value: number | Dice | MathOperator) => {
        if (value instanceof Dice) return '+' + value.total;
        return value;
      })
      .join(' ')
      .replace(/[+][ ][+]/g, '+ ')
      .replace(/[-][ ][+]/g, '- ');
  }

  orderRolls(...args: any[]) {
    for (let i = 0; i < args.length; i++) {
      const value = args[i];
      if (this.isNumber(value)) {
        this.pushRoll(value);
      } else if (this.isMathOperator(value)) {
        this.pushRoll(value);
      } else if (this.isDice(value)) {
        const dice = new Dice(+value.split('d')[0], +value.split('d')[1]);
        this.pushRoll(dice);
      } else if (this.isLogicOperator(value)) {
        this.pushRoll(value);
      } else {
        throw new Error(`Invalid roll: ${value}`);
      }
    }
  }
  pushRoll(value: number | Dice | MathOperator) {
    this.__rolls.push(value);
  }
  defineTotal() {
    this.expression = this.__rolls.join(' ');
    this.mathExpression = this.getMathExpression(this.__rolls);
    this.total = evaluate(this.mathExpression);
  }
  constructor(...args: any[]) {
    this.orderRolls(...args);
    this.defineTotal();
  }
}
