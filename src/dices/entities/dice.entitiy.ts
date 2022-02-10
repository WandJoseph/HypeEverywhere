export class Dice {
  quantity: number;
  faces: number;
  isRolled: boolean;
  rolls: number[] = [];
  public total: number;
  constructor(quantity: number, faces: number) {
    this.quantity = quantity;
    this.faces = faces;

    if (quantity <= 0 || faces <= 0) {
      throw new Error(
        `Dado inválido, é necessário que as faces e a quantidade seja maior que 0, Dado: ${quantity}d${faces}`,
      );
    }
    if (quantity > 100 && faces > 1000) {
      throw new Error('Dice cannot be more than 100d1000');
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
    this.isRolled = true;
  }

  toString(): string {
    return `${this.quantity}d${this.faces}: [${this.rolls.join(', ')}]`;
  }
}
