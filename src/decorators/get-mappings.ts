import { ENTITY_PROP_KEY } from './constants';

export function getEntityMappings(target: Function): Record<string, string> {
  // @ts-ignore
  return Reflect.getMetadata(ENTITY_PROP_KEY, target) || {};
}
