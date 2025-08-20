import 'reflect-metadata';
declare global {
  interface Reflect {
    defineMetadata(metadataKey: any, metadataValue: any, target: Object, propertyKey?: string | symbol): void;
    getMetadata(metadataKey: any, target: Object, propertyKey?: string | symbol): any;
  }
}
const ENTITY_CLASS_KEY = Symbol("entity:class");

export function Entity(EntityClass: new (...args: any[]) => any): ClassDecorator {
  return function (target: Function) {
  // @ts-ignore
  Reflect.defineMetadata(ENTITY_CLASS_KEY, EntityClass, target);
    (target as any).prototype.mapToEntity = function () {
      const mappings = getEntityMappings(target);
      const entityObj: any = {};
      for (const [dtoKey, meta] of Object.entries(mappings)) {
        if (dtoKey === 'mapToEntity' || dtoKey === 'mapFromEntity') continue;
        let entityKey: string;
        if (meta && typeof meta === 'object' && meta !== null && 'source' in (meta as object)) {
          entityKey = (meta as any).source;
        } else {
          entityKey = meta as string;
        }
        const value = (this as any)[dtoKey];
        // Gestion des tableaux de DTO ou d'entités
        if (Array.isArray(value) && value.length > 0) {
          entityObj[entityKey] = value.map((item: any) => {
            if (typeof item?.mapToEntity === 'function') {
              return item.mapToEntity();
            } else {
              // Utilise les getters publics
              const publicObj: any = {};
              const proto = Object.getPrototypeOf(item);
              Object.getOwnPropertyNames(proto)
                .filter(prop => {
                  const desc = Object.getOwnPropertyDescriptor(proto, prop);
                  return desc && typeof desc.get === 'function';
                })
                .forEach(getter => {
                  publicObj[getter] = item[getter];
                });
              return publicObj;
            }
          });
        } else if (value && typeof value.mapToEntity === 'function') {
          entityObj[entityKey] = value.mapToEntity();
        } else if (value && typeof value === 'object') {
          // Utilise les getters publics pour les objets
          const publicObj: any = {};
          const proto = Object.getPrototypeOf(value);
          Object.getOwnPropertyNames(proto)
            .filter(prop => {
              const desc = Object.getOwnPropertyDescriptor(proto, prop);
              return desc && typeof desc.get === 'function';
            })
            .forEach(getter => {
              publicObj[getter] = value[getter];
            });
          entityObj[entityKey] = publicObj;
        } else {
          entityObj[entityKey] = value;
        }
      }
      return entityObj;
    };

    (target as any).prototype.mapFromEntity = function (entity: any) {
      const mappings = getEntityMappings(target);
      for (const [dtoKey, meta] of Object.entries(mappings)) {
        if (dtoKey === 'mapToEntity' || dtoKey === 'mapFromEntity') continue;
        let entityKey: string;
        let dtoClass: any;
        if (meta && typeof meta === 'object' && meta !== null && 'source' in (meta as object)) {
          entityKey = (meta as any).source;
          dtoClass = (meta as any).dtoClass;
        } else {
          entityKey = meta as string;
          dtoClass = undefined;
        }
        const value = entity[entityKey];
        if (Array.isArray(value) && value.length > 0 && dtoClass) {
          (this as any)[dtoKey] = value.map((item: any) => {
            const dtoInstance = new dtoClass();
            if (typeof dtoInstance.mapFromEntity === 'function') {
              dtoInstance.mapFromEntity(item);
              return dtoInstance;
            }
            return item;
          });
        } else if (value && dtoClass) {
          const dtoInstance = new dtoClass();
          if (typeof dtoInstance.mapFromEntity === 'function') {
            dtoInstance.mapFromEntity(value);
            (this as any)[dtoKey] = dtoInstance;
          } else {
            (this as any)[dtoKey] = value;
          }
        } else {
          (this as any)[dtoKey] = value;
        }
      }
      return this;
    };
  // ...existing code...
  };
}
const ENTITY_PROP_KEY = Symbol("entity:property");

export interface EntityPropertyOptions {
  source: string;
  mapClass?: any;
}

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

export function getEntityMappings(target: Function): Record<string, string> {
  // @ts-ignore
  return Reflect.getMetadata(ENTITY_PROP_KEY, target) || {};
}




export function mapToEntity<T, U>(
  dto: U,
  EntityClass: new () => T,
  DtoClass: new () => U
): T {
  const entity = new EntityClass();
  const mappings = getEntityMappings(DtoClass);

  for (const [dtoKey, entityKey] of Object.entries(mappings)) {
    if (dtoKey === 'mapToEntity') continue;
    (entity as any)[entityKey] = (dto as any)[dtoKey];
  }

  return entity;
}