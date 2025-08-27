export class Identifier {
  private _value!: string;

  private constructor(value: string) {
    this._value = value;
  }

  public static create(value: string): Identifier {
    return new Identifier(value);
  }

  public get value(): string {
    return this._value;
  }
}
