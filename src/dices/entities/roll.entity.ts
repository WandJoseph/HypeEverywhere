import { CDN } from '@discordjs/rest';
import { evaluate } from 'mathjs';
import { Dice } from './dice.entitiy';

export type MathOperator = '+' | '-' | '*' | '/';
export type LogicOperator = '<' | '>' | '<=' | '>=' | '==' | '!=';

export class Roll {
  public rightExpr: string;
  public rightDiceExpr: string;
  public rightValues: Array<Dice | string>;
  public rightTotal: number;
  public operator: string;
  public leftExpr: string;
  public leftDiceExpr: string;
  public leftValues: Array<Dice | string>;
  public leftTotal: number;
  public total: number;
  public result: boolean;

  splitByOperator(expression: string): string[] {
    for (const operator of ['<', '>']) {
      if (expression.includes(operator)) {
        const [left, right] = expression.split(operator);
        this.leftExpr = left;
        this.rightExpr = right;
        this.operator = operator + '=';
        return;
      }
    }
    this.leftExpr = expression;
    this.rightExpr = '';
  }
  getTotalFromExpression(expr: string) {
    const args = expr.split(' ');
    const rolls: Array<Dice | string> = [];
    for (const arg of args) {
      if (Dice.isDice(arg)) {
        const [faces, quantity] = arg.split('d');
        rolls.push(new Dice(+faces, +quantity));
      } else {
        rolls.push(arg);
      }
    }
    return rolls;
  }
  private getTotal(values: Array<Dice | string>): number {
    let expr = '';
    for (const value of values) {
      if (typeof value === 'string') {
        expr += value + ' ';
      } else {
        expr += value.total + ' ';
      }
    }
    return evaluate(expr);
  }
  private getDiceExpr(values: Array<Dice | string>): string {
    let expr = '';
    for (const value of values) {
      if (typeof value === 'string') {
        expr += value + ' ';
      } else {
        expr += `${value}`;
      }
    }
    return expr;
  }
  defineResult() {
    this.leftDiceExpr = this.getDiceExpr(this.leftValues);
    if (!this.rightTotal) {
      this.total = this.leftTotal;
      return;
    }
    this.rightDiceExpr = this.getDiceExpr(this.rightValues);
    this.result = evaluate(this.leftTotal + this.operator + this.rightTotal);
  }

  constructor(
    public readonly expression: string,
    public readonly originalExpr?: string,
  ) {
    this.originalExpr = originalExpr || expression;
    this.splitByOperator(this.expression);
    this.leftValues = this.getTotalFromExpression(this.leftExpr);
    this.rightValues = this.getTotalFromExpression(this.rightExpr);
    this.leftTotal = this.getTotal(this.leftValues);
    this.rightTotal = this.getTotal(this.rightValues);
    this.defineResult();
  }
}
