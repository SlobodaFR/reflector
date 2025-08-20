# Tutoriel : Démarrer avec Reflector

## 1. Introduction

Reflector est une librairie TypeScript qui simplifie le mapping entre DTOs et Entities grâce à des décorateurs. Elle permet d’écrire du code plus propre et maintenable, sans logique de mapping manuelle.

---

## 2. Prérequis

- Node.js (v18+ recommandé)
- TypeScript (v5+)
- Un projet TypeScript initialisé (`npm init` + `tsconfig.json`)

---

## 3. Installation

Installe la librairie et la dépendance nécessaire :

```sh
npm install @thomassloboda/reflector reflect-metadata
```

---

## 4. Configuration du projet

Active les décorateurs et la génération de métadonnées dans ton `tsconfig.json` :

```jsonc
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
    // ...autres options...
  }
}
```

> [!TIP]
> Ajoute `import 'reflect-metadata';` en tout début de ton fichier principal.

---

## 5. Création d’un DTO et d’une Entity

Crée une classe Entity :

```typescript
// entity.ts
export class UserEntity {
  id!: string;
  name!: string;
}
```

Crée une classe DTO :

```typescript
// user.dto.ts
import { Entity, EntityProperty } from '@thomassloboda/reflector';

@Entity(UserEntity)
export class UserDTO {
  @EntityProperty('id')
  public id!: string;

  @EntityProperty('name')
  public name!: string;
}
```

---

## 6. Utilisation des décorateurs

Les décorateurs `@Entity` et `@EntityProperty` permettent de lier le DTO à l’Entity et de définir le mapping des propriétés.

---

## 7. Mapping DTO → Entity

Pour convertir un DTO en Entity :

```typescript
const dto = new UserDTO();
dto.id = 'u123';
dto.name = 'Alice';

const entity = (dto as any).mapToEntity();
console.log(entity); // { id: 'u123', name: 'Alice' }
```

---

## 8. Mapping Entity → DTO

Pour remplir un DTO à partir d’une Entity :

```typescript
const entity = { id: 'u456', name: 'Bob' };

const dto = new UserDTO();
(dto as any).mapFromEntity(entity);

console.log(dto.id);   // 'u456'
console.log(dto.name); // 'Bob'
```

---

## 9. Résumé et bonnes pratiques

- Active toujours les décorateurs dans TypeScript
- Importe `reflect-metadata` au début de ton projet
- Utilise les décorateurs pour un mapping automatique et maintenable
- Les propriétés privées ou non décorées ne sont pas mappées

---

Tu es maintenant prêt à utiliser Reflector pour mapper tes DTOs et Entities facilement !
