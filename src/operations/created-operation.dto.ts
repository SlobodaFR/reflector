import { Entity, EntityProperty } from "../utils/entity-decorators";
import { Operation } from "./operation";
import { OperationStep } from "./operation-step";

@Entity(OperationStep)
export class CreatedOperationStepRequestDTO {
    @EntityProperty('stepIdentifier')
    id: string;

    @EntityProperty('stepDescription')
    description: string;
}

@Entity(Operation)
export class CreatedOperationDTO {
    @EntityProperty('operationIdentifier')
    id: string;

    @EntityProperty('version')
    version: number;

    @EntityProperty('steps', { mapClass: CreatedOperationStepRequestDTO })
    public steps!: CreatedOperationStepRequestDTO[];
}