import { Entity, EntityProperty } from "../utils/entity-decorators";
import { Operation } from "./operation";
import { OperationStep } from "./operation-step";

@Entity(OperationStep)
export class CreateOperationStepRequestDTO {
    @EntityProperty('stepIdentifier')
    public id!: string;

    @EntityProperty('stepDescription')
    public description!: string;
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

