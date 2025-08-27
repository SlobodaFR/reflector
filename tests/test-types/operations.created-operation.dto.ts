import { Entity, EntityProperty } from '../../src';
import { Operation, OperationStep } from './';
import { OperationStepContext } from './operations.operation-step-context';

@Entity(OperationStep)
export class CreatedOperationStepRequestDTO {
  @EntityProperty('stepIdentifier')
  id: string;

  @EntityProperty('stepDescription')
  description: string;

  @EntityProperty('stepContext')
  public context!: OperationStepContext;
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
