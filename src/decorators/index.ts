import 'reflect-metadata';
declare global {
  interface Reflect {
    defineMetadata(metadataKey: any, metadataValue: any, target: Object, propertyKey?: string | symbol): void;
    getMetadata(metadataKey: any, target: Object, propertyKey?: string | symbol): any;
  }
}

export * from './entity';
export * from './entity-property';
