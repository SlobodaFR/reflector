# Reflector

> **Reflector** is a TypeScript library for seamless mapping between DTOs, entities, and other data models (e.g., Mongoose, Prisma schemas) using decorators and dynamic reflection.

---

## Overview

Reflector provides a flexible and extensible way to map objects between layers (DTOs, entities, schemas) in your application. It leverages TypeScript decorators and metadata to automate bidirectional mapping, including support for nested/child objects.

- **Declarative mapping**: Use `@EntityProperty` and `@Entity` decorators to describe how your DTOs and entities relate.
- **Recursive mapping**: Child objects and arrays are mapped automatically using the `mapClass` option.
- **Extensible**: Works with DTOs, entities, and can be extended to other models (Mongoose, Prisma, etc).

## Features

- Decorator-based property mapping
- Automatic deep mapping for nested objects/arrays
- Bidirectional conversion (`mapToEntity`, `mapFromEntity`)
- TypeScript-first, zero runtime config
- Easily extensible for other model types

## Getting Started

```bash
npm install reflect-metadata
```

Add the following to your `tsconfig.json`:
```jsonc
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "types": ["node"],
    "moduleResolution": "nodenext",
    "module": "NodeNext"
  }
}
```

## Usage Example

```typescript
import { Entity, EntityProperty } from "./utils/entity-decorators";

@Entity(User)
class UserDTO {
  @EntityProperty('id')
  public id!: string;

  @EntityProperty('profile', { mapClass: ProfileDTO })
  public profile!: ProfileDTO;
}

@Entity(Profile)
class ProfileDTO {
  @EntityProperty('bio')
  public bio!: string;
}

const userDto = new UserDTO();
userDto.id = '123';
userDto.profile = new ProfileDTO();
userDto.profile.bio = 'Hello!';

// Map DTO to entity
const userEntity = userDto.mapToEntity();

// Map entity to DTO
const newUserDto = new UserDTO();
newUserDto.mapFromEntity(userEntity);
```

## Project Structure

```
reflector/
├── src/
│   ├── utils/entity-decorators.ts
│   ├── operations/
│   │   ├── create-operation.dto.ts
│   │   ├── created-operation.dto.ts
│   │   ├── operation-step.ts
│   │   ├── operation.ts
│   ├── vehicles/
│   │   ├── create-vehicle.dto.ts
│   │   ├── vehicle.entity.ts
│   ├── shared/
│   │   ├── identifier.ts
│   │   ├── version.ts
│   ├── index.ts
├── package.json
├── tsconfig.json
```

## Admonition

> [!TIP]
> Use the `mapClass` option in `@EntityProperty` to enable deep mapping for arrays or nested objects.

## FAQ

**Q: Can I use Reflector with Mongoose or Prisma schemas?**  
A: Yes! Just pass your schema class as `mapClass` in the decorator options.

**Q: Does Reflector support deep/nested mapping?**  
A: Yes, child objects and arrays are mapped recursively if you specify `mapClass`.

**Q: Is runtime configuration required?**  
A: No, everything is handled via TypeScript decorators and metadata.

---

> For more advanced usage, see the source code and examples in the `src/` directory.
