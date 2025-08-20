import "reflect-metadata";
import { CreateOperationRequestDTO, CreateOperationStepRequestDTO } from "./operations/create-operation.dto";
import { CreatedOperationDTO } from "./operations/created-operation.dto";


const createOperationDTO = new CreateOperationRequestDTO();
createOperationDTO.id = 'operation-1';
createOperationDTO.version = 1;
createOperationDTO.steps = [];

const firstStep = new CreateOperationStepRequestDTO();
firstStep.id = 'step-1';
firstStep.description = 'First step';

const secondStep = new CreateOperationStepRequestDTO();
secondStep.id = 'step-2';
secondStep.description = 'Second step';

createOperationDTO.steps.push(firstStep, secondStep);


// @ts-ignore
const entity = createOperationDTO.mapToEntity();

console.log('-----------------------');
console.log('CreateOperationRequestDTO -> Operation entity:');
console.log(JSON.stringify(entity, null, 2));

const createdOperationDTO = new CreatedOperationDTO();
// @ts-ignore
createdOperationDTO.mapFromEntity(entity);

console.log('-----------------------');
console.log('Operation entity -> CreatedOperationDTO:');
console.log(JSON.stringify(createdOperationDTO, null, 2));



console.log('-----------------------');