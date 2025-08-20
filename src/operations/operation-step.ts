import { Identifier } from "../shared/identifier";

export class OperationStep {
    private _stepIdentifier!: Identifier;
    private _stepDescription!: string;

    constructor({ stepIdentifier, stepDescription }: { stepIdentifier: Identifier, stepDescription: string }) {
        this._stepIdentifier = stepIdentifier;
        this._stepDescription = stepDescription;
    }

    public static create({ stepIdentifier, stepDescription }: { stepIdentifier: Identifier, stepDescription: string }): OperationStep {
        return new OperationStep({ stepIdentifier, stepDescription });
    }

    public get stepIdentifier(): string {
        return this._stepIdentifier.value;
    }

    public get stepDescription(): string {
        return this._stepDescription;
    }
}