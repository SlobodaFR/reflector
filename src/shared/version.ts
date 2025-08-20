export class Version {
    private _value!: number;

    private constructor(value: number) {
        if (!Number.isInteger(value) || value < 0) {
            throw new Error("Invalid version number");
        }
        this._value = value;
    }

    public static create(value: number): Version {
        return new Version(value);
    }

    public get value(): number {
        return this._value;
    }
}