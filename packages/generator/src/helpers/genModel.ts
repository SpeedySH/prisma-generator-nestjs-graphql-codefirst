import { DMMF } from '@prisma/generator-helper';
import { uppercaseFirstLetter } from '../utils';

const NEST_GRAPHQL_DEFINE = '@ObjectType()' as const;
const NEST_GRAPHQL_HIDE_FIELD = '@HideField()' as const;

const hashTable = {
  String: 'string',
  DateTime: 'Date',
  Boolean: 'boolean',
  Int: 'number',
  Float: 'number',
} as Record<string, string>;

const hashTableGQL = {
  String: 'String',
  DateTime: 'Date',
  Boolean: 'Boolean',
  Int: 'Int',
  Float: 'Float',
} as Record<string, string>;

export const buildImportsHelper =
  (importsMap: Map<string, Set<string>>) => (from: string, add: string) => {
    importsMap.has(from) ? importsMap.get(from)?.add(add) : importsMap.set(from, new Set([add]));
  };

const buildBodyHelper = (field: DMMF.Field) => {
  if (typeof field.type === 'string') {
    // Parse all fields from /// comments
    const layers = new Set(field.documentation?.split('\n'));

    const defaultDecoratorAddition =
      field.hasDefaultValue && typeof field.default !== 'object'
        ? `, {defaultValue:${
            field.kind === 'enum' ? `${field.type}.${field.default}` : `${field.default}`
          }}`
        : '';
    const idDecoratorAddition = field.isId ? 'ID' : hashTableGQL[field.type] ?? field.type;
    const nullableDecoratorAddition =
      field.isRequired || field.hasDefaultValue ? '' : `, {nullable: true}`;

    const fieldDecorator = `@Field(() => ${idDecoratorAddition}${nullableDecoratorAddition}${defaultDecoratorAddition})`;

    if (!layers.has(NEST_GRAPHQL_HIDE_FIELD)) layers.add(fieldDecorator);

    const nullablePropertyAddition = field.isRequired || field.hasDefaultValue ? '' : ' | null';
    const enumPropertyAddition = field.kind === 'enum' ? `keyof typeof ${field.type}` : '';
    const objectPropertyAddition = field.kind === 'object' ? `${field.type}` : '';
    const scalarPropertyAddition = field.kind === 'scalar' ? `${hashTable[field.type]}` : '';
    const relationPropertyAddition = field.relationName ? '?' : '';
    // const typePropertyAddition = hashTable[field.type] ?? `keyof typeof ${field.type}`;

    //* :D
    const fieldProperty = `${field.name}${relationPropertyAddition}: ${scalarPropertyAddition}${objectPropertyAddition}${enumPropertyAddition}${nullablePropertyAddition};`;

    layers.add(fieldProperty);

    return [...layers].join('\n');
  }

  throw new Error('Unknown type of field.type');
};

export const genModel = ({ name, fields }: DMMF.Model): [Map<string, Set<string>>, string] => {
  const imports = new Map<string, Set<string>>();
  const body: string[] = [];

  const addImport = buildImportsHelper(imports);

  const nameOfModel = uppercaseFirstLetter(name);

  const modelHeader = `export class ${nameOfModel} {`;
  const modelTail = `}`;

  const result: string[] = [];

  addImport('@nestjs/graphql', 'ObjectType');
  addImport('@nestjs/graphql', 'Field');

  result.push(NEST_GRAPHQL_DEFINE);
  result.push(modelHeader);

  for (const field of fields) {
    if (field.isId) {
      addImport('@nestjs/graphql', 'ID');
    }
    if (field.documentation?.includes(NEST_GRAPHQL_HIDE_FIELD)) {
      addImport('@nestjs/graphql', 'HideField');
    }
    // if (field.kind === 'enum') {
    //   addImport('./enums.ts', `${field.type}`);
    // }

    body.push(buildBodyHelper(field));

    body.push('\n');
  }

  result.push([...body].join('\n'));

  result.push(modelTail);

  // Add Space After Imports
  result.unshift('\n');

  return [imports, result.join('\n')];
};
