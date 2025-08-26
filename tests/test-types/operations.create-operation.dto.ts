import { Entity, EntityProperty } from "../../src";
import { Operation, OperationStep } from "./";
import { OperationStepContext } from "./operations.operation-step-context";

@Entity(OperationStep)
export class CreateOperationStepRequestDTO {
    @EntityProperty('stepIdentifier')
    public id!: string;

    @EntityProperty('stepDescription')
    public description!: string;

    @EntityProperty('stepContext')
    public context!: OperationStepContext;
}

@Entity(Operation)
export class CreateOperationRequestDTO {
    @EntityProperty('operationIdentifier')
    public id!: string;

    @EntityProperty('version')
    public version!: number;

    @EntityProperty('steps', {mapClass: CreateOperationStepRequestDTO})
    public steps!: CreateOperationStepRequestDTO[];
}


