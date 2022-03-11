export class Dice {
  quantity: number;
  faces: number;
  isRolled: boolean;
  rolls: number[] = [];
  public total: number;
  constructor(faces: number);
  constructor(quantity: number, faces?: number);
  constructor(quantity: number, faces?: number) {
    this.quantity = quantity ? quantity : 1;
    this.faces = faces;

    if (this.quantity <= 0 || this.faces <= 0) {
      throw new Error(
        `Dado inválido, é necessário que as faces e a quantidade seja maior que 0, Dado: ${this.quantity}d${this.faces}`,
      );
    }
    if (this.quantity > 100 && this.faces > 1000) {
      throw new Error('O dado não pode ser maior que 100d1000');
    }
    this.roll();
  }
  private roll() {
    if (this.isRolled) return;

    this.total = 0;
    for (let i = 0; i < this.quantity; i++) {
      const result = Math.floor(Math.random() * this.faces) + 1;
      this.rolls.push(result);
      this.total += result;
    }
    this.rolls.sort((a, b) => a - b);
    this.isRolled = true;
  }

  toString(): string {
    return `${this.quantity}d${this.faces}: **${
      this.total
    }** [${this.rolls.join(', ')}]`;
  }
  static isDice(value: string): boolean {
    const rolls: string[] = value.split('d');
    if (rolls.length !== 2) return false;
    if (isNaN(+rolls[0]) || isNaN(+rolls[1])) return false;
    return true;
  }
}
