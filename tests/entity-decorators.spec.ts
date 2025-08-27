import 'reflect-metadata';
import {
  CreateOperationRequestDTO,
  CreateOperationStepRequestDTO,
  CreatedOperationDTO,
} from './test-types';

describe('Entity Decorators Mapping', () => {
  it('should map DTO to entity and back', () => {
    const createOperationDTO = new CreateOperationRequestDTO();
    createOperationDTO.id = 'operation-1';
    createOperationDTO.version = 1;

    const createOperationStepDTO = new CreateOperationStepRequestDTO();
    createOperationStepDTO.id = 'step-1';
    createOperationStepDTO.description = 'Step 1';
    createOperationStepDTO.context = 'Context-1';

    createOperationDTO.steps = [createOperationStepDTO];

    const entity = (createOperationDTO as any).mapToEntity();
    expect(entity.operationIdentifier).toBe('operation-1');
    expect(entity.version).toBe(1);
    expect(Array.isArray(entity.steps)).toBe(true);

    const createdOperationDTO = new CreatedOperationDTO();
    (createdOperationDTO as any).mapFromEntity(entity);
    expect(createdOperationDTO.id).toBe('operation-1');
    expect(createdOperationDTO.version).toBe(1);
    expect(Array.isArray(createdOperationDTO.steps)).toBe(true);
    expect(createdOperationDTO.steps[0].id).toBe('step-1');
    expect(createdOperationDTO.steps[0].description).toBe('Step 1');
    expect(createdOperationDTO.steps[0].context).toBe('Context-1');
  });
});
