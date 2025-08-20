import "reflect-metadata";
import { CreateOperationRequestDTO, CreatedOperationDTO } from "./test-types";

describe('Entity Decorators Mapping', () => {
  it('should map DTO to entity and back', () => {
    const createOperationDTO = new CreateOperationRequestDTO();
    createOperationDTO.id = 'operation-1';
    createOperationDTO.version = 1;
    createOperationDTO.steps = [];

    const entity = (createOperationDTO as any).mapToEntity();
    expect(entity.operationIdentifier).toBe('operation-1');
    expect(entity.version).toBe(1);
    expect(Array.isArray(entity.steps)).toBe(true);

    const createdOperationDTO = new CreatedOperationDTO();
    (createdOperationDTO as any).mapFromEntity(entity);
    expect(createdOperationDTO.id).toBe('operation-1');
    expect(createdOperationDTO.version).toBe(1);
    expect(Array.isArray(createdOperationDTO.steps)).toBe(true);
  });
});
