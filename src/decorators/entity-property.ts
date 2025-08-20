import { ENTITY_PROP_KEY } from "./constants";


export function EntityProperty(source: string, options?: { mapClass?: any }): PropertyDecorator {
  return (target: Object, propertyKey: string | symbol) => {
    const ctor = (target as any).constructor;
    if (!ctor) return; // sécurité

    // @ts-ignore
    const existing = Reflect.getMetadata(ENTITY_PROP_KEY, ctor) || {};
    existing[propertyKey.toString()] = { source, mapClass: options?.mapClass };
    // @ts-ignore
    Reflect.defineMetadata(ENTITY_PROP_KEY, existing, ctor);
  };
}