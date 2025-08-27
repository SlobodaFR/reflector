# Reflector

> TypeScript decorators for seamless DTO ↔ Entity mapping

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SlobodaFR_reflector&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ORG_REPO)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=SlobodaFR_reflector&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ORG_REPO)
[![npm version](https://img.shields.io/npm/v/thomassloboda-reflector.svg)](https://www.npmjs.com/package/thomassloboda-reflector)
[![npm downloads](https://img.shields.io/npm/dm/thomassloboda-reflector.svg)](https://www.npmjs.com/package/thomassloboda-reflector)
[![Stable CI](https://github.com/SlobodaFR/reflector/actions/workflows/release-main.yml/badge.svg)](https://github.com/SlobodaFR/reflector/actions/workflows/ci.yml)
[![Beta CI](https://github.com/SlobodaFR/reflector/actions/workflows/release-beta.yml/badge.svg)](https://github.com/SlobodaFR/reflector/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Reflector is a lightweight TypeScript library that lets you map between DTOs and Entities using decorators and runtime metadata. It’s designed for clean, maintainable code in Node.js and TypeScript projects.

---

## Features
- 🚀 Decorator-based mapping for DTOs and Entities
- 🔄 Automatic, recursive property mapping (including arrays)
- 🛡️ Only public properties are mapped
- 🧩 Extensible for custom mapping logic
- 📦 Zero runtime dependencies (except `reflect-metadata`)

---

## Installation

```sh
npm install @thomassloboda/reflector reflect-metadata
```

> [!IMPORTANT]
> You must enable `experimentalDecorators` and `emitDecoratorMetadata` in your `tsconfig.json`.

```jsonc
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

---

## Quick Start

```typescript
import 'reflect-metadata';
import { Entity, EntityProperty } from '@thomassloboda/reflector';

@Entity(UserEntity)
class UserDTO {
  @EntityProperty('id')
  public id!: string;

  @EntityProperty('name')
  public name!: string;
}

const dto = new UserDTO();
dto.id = 'u123';
dto.name = 'Alice';

const entity = (dto as any).mapToEntity();
// entity: { id: 'u123', name: 'Alice' }
```

---

## API Overview

### Decorators
- `@Entity(EntityClass)` — Attach mapping logic to a DTO
- `@EntityProperty('propertyName', { mapClass?: Class })` — Map a DTO property to an entity property

### Methods
- `mapToEntity()` — Map DTO to entity object
- `mapFromEntity(entity)` — Populate DTO from entity object
- `getEntityMappings(target)` — Get mapping metadata
- `mapToEntity<T, U>(dto, EntityClass, DtoClass)` — Utility for manual mapping

---

## Advanced Usage

- **Nested objects & arrays**: Use `mapClass` to recursively map child DTOs
- **Type safety**: Use TypeScript type assertions if needed
- **Custom logic**: Extend DTOs/entities for custom mapping

---

## FAQ & Tips

> [!TIP]
> Always import `reflect-metadata` at the top of your entry file.

> [!WARNING]
> Only public properties (with getters) are mapped. Private fields are ignored.

> [!NOTE]
> The library is framework-agnostic and works with any Node.js/TypeScript project.

---

## Useful Links
- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
- [API Reference](./src/index.ts)

---

Enjoy clean, declarative mapping in your TypeScript projects!
