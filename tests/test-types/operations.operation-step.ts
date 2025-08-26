import { Identifier } from "./";
import { OperationStepContext } from "./operations.operation-step-context";

type CreateOperationStepProps = {
    stepIdentifier: Identifier;
    stepDescription: string;
    stepContext: OperationStepContext;
};

type OperationStepProps = {
    stepIdentifier: Identifier;
    stepDescription: string;
    stepContext: OperationStepContext;
};

export class OperationStep {
    private _stepIdentifier!: Identifier;
    private _stepDescription!: string;
    private _stepContext?: OperationStepContext;

    constructor({
        stepIdentifier,
        stepDescription,
        stepContext
    }: OperationStepProps) {
        this._stepIdentifier = stepIdentifier;
        this._stepDescription = stepDescription;
        this._stepContext = stepContext;
    }

    public static create({
        stepIdentifier,
        stepDescription,
        stepContext
    }: CreateOperationStepProps): OperationStep {
        return new OperationStep({ stepIdentifier, stepDescription, stepContext });
    }

    public get stepIdentifier(): string {
        return this._stepIdentifier.value;
    }

    public get stepDescription(): string {
        return this._stepDescription;
    }

    public get stepContext(): OperationStepContext {
        return this._stepContext;
    }
}
