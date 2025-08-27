import { ENTITY_CLASS_KEY } from './constants';
import { getEntityMappings } from './get-mappings';

// eslint-disable-next-line no-unused-vars
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
        let mapClass: any = undefined;
        if (meta && typeof meta === 'object' && meta !== null && 'source' in (meta as object)) {
          entityKey = (meta as any).source;
          mapClass = (meta as any).mapClass;
        } else {
          entityKey = meta as string;
        }
        const value = (this as any)[dtoKey];
        // Gestion des tableaux de DTO ou d'entités avec mapClass
        if (Array.isArray(value)) {
          if (mapClass) {
            entityObj[entityKey] = value.map((item: any) => {
              if (typeof item?.mapToEntity === 'function') {
                return item.mapToEntity();
              } else {
                // Utilise les getters publics
                const publicObj: any = {};
                const proto = Object.getPrototypeOf(item);
                Object.getOwnPropertyNames(proto)
                  .filter((prop) => {
                    const desc = Object.getOwnPropertyDescriptor(proto, prop);
                    return desc && typeof desc.get === 'function';
                  })
                  .forEach((getter) => {
                    publicObj[getter] = item[getter];
                  });
                return publicObj;
              }
            });
          } else {
            entityObj[entityKey] = value;
          }
        } else if (value && typeof value.mapToEntity === 'function') {
          entityObj[entityKey] = value.mapToEntity();
        } else if (value && typeof value === 'object') {
          // Utilise les getters publics pour les objets
          const publicObj: any = {};
          const proto = Object.getPrototypeOf(value);
          Object.getOwnPropertyNames(proto)
            .filter((prop) => {
              const desc = Object.getOwnPropertyDescriptor(proto, prop);
              return desc && typeof desc.get === 'function';
            })
            .forEach((getter) => {
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
            } else {
              // Manual mapping for DTO property names
              const itemMappings = getEntityMappings(dtoClass);
              for (const [subDtoKey, subMeta] of Object.entries(itemMappings)) {
                let subEntityKey: string;
                if (
                  subMeta &&
                  typeof subMeta === 'object' &&
                  subMeta !== null &&
                  'source' in (subMeta as object)
                ) {
                  subEntityKey = (subMeta as any).source;
                } else {
                  subEntityKey = subMeta as string;
                }
                dtoInstance[subDtoKey] = item[subEntityKey];
              }
              return dtoInstance;
            }
          });
        } else if (value && dtoClass) {
          const dtoInstance = new dtoClass();
          if (typeof dtoInstance.mapFromEntity === 'function') {
            dtoInstance.mapFromEntity(value);
            (this as any)[dtoKey] = dtoInstance;
          } else {
            // Manual mapping for DTO property names
            const itemMappings = getEntityMappings(dtoClass);
            for (const [subDtoKey, subMeta] of Object.entries(itemMappings)) {
              let subEntityKey: string;
              if (
                subMeta &&
                typeof subMeta === 'object' &&
                subMeta !== null &&
                'source' in (subMeta as object)
              ) {
                subEntityKey = (subMeta as any).source;
              } else {
                subEntityKey = subMeta as string;
              }
              dtoInstance[subDtoKey] = value[subEntityKey];
            }
            (this as any)[dtoKey] = dtoInstance;
          }
        } else {
          (this as any)[dtoKey] = value;
        }
      }
      return this;
    };
  };
}
