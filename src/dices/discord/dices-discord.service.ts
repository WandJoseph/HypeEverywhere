import { Dice } from '../entities/dice.entitiy';
import { Roll } from '../entities/roll.entity';
export class DicesDiscordService {
  isNumber(value: string) {
    return !isNaN(+value);
  }
  isDice(value: string) {
    const rolls: string[] = value.split('d');
    if (rolls.length !== 2) return false;
    if (!this.isNumber(rolls[0]) || !this.isNumber(rolls[1])) return false;
    return true;
  }
  isOperator(value: string) {
    return value === '+' || value === '-' || value === '*' || value === '/';
  }

  roll(...args: string[]) {
    const roll = new Roll(...args);
    return roll;
  }

  dice(n: number, f: number): Dice {
    const dice = new Dice(n, f);
    return dice;
  }
}
