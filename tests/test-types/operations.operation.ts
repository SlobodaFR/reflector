import { Identifier, Version, OperationStep } from './';

export class Operation {
  private _operationIdentifier!: Identifier;
  private _version!: Version;
  private _steps: OperationStep[] = [];

  constructor({
    operationIdentifier,
    version,
    steps,
  }: {
    operationIdentifier: Identifier;
    version: Version;
    steps: OperationStep[];
  }) {
    this._operationIdentifier = operationIdentifier;
    this._version = version;
    this._steps = steps;
  }

  public static create({
    operationIdentifier,
    version,
    steps,
  }: {
    operationIdentifier: Identifier;
    version: Version;
    steps: OperationStep[];
  }): Operation {
    return new Operation({ operationIdentifier, version, steps });
  }

  public get operationIdentifier(): string {
    return this._operationIdentifier.value;
  }

  public get version(): number {
    return this._version.value;
  }

  public get steps(): OperationStep[] {
    return this._steps;
  }
}
