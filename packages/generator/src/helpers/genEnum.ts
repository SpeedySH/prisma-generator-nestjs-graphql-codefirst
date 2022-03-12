import { DMMF } from '@prisma/generator-helper'

export const genEnum = ({ name, values }: DMMF.DatamodelEnum) => {
  const enumValues = values.map(({ name }) => `${name}="${name}"`).join(',\n')

  return `export enum ${name} { \n${enumValues}\n }`
}

/*
prisma:info prisma-generator-nestjs-graphql-codefirst:Registered
{
  name: 'id',
  kind: 'scalar',
  isList: false,
  isRequired: true,
  isUnique: false,
  isId: true,
  isReadOnly: false,
  type: 'String',
  hasDefaultValue: true,
  default: { name: 'auto', args: [] },
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'email',
  kind: 'scalar',
  isList: false,
  isRequired: false,
  isUnique: true,
  isId: false,
  isReadOnly: false,
  type: 'String',
  hasDefaultValue: false,
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'grant',
  kind: 'enum',
  isList: false,
  isRequired: true,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'Grands',
  hasDefaultValue: true,
  default: 'USER',
  isGenerated: false,
  isUpdatedAt: false,
  documentation: '@HideField()'
}
{
  name: 'createdAt',
  kind: 'scalar',
  isList: false,
  isRequired: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'DateTime',
  hasDefaultValue: true,
  default: { name: 'now', args: [] },
  isGenerated: false,
  isUpdatedAt: false,
  documentation: '@HideField()'
}
{
  name: 'updatedAt',
  kind: 'scalar',
  isList: false,
  isRequired: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'DateTime',
  hasDefaultValue: true,
  default: { name: 'now', args: [] },
  isGenerated: false,
  isUpdatedAt: true,
  documentation: '@HideField()'
}
{
  name: 'Profile',
  kind: 'object',
  isList: false,
  isRequired: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'Profile',
  hasDefaultValue: false,
  relationName: 'ProfileTouser',
  relationFromFields: [],
  relationToFields: [],
  isGenerated: false,
  isUpdatedAt: false
}

NEXT:

{
  name: 'id',
  kind: 'scalar',
  isList: false,
  isRequired: true,
  isUnique: false,
  isId: true,
  isReadOnly: false,
  type: 'String',
  hasDefaultValue: true,
  default: { name: 'auto', args: [] },
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'user',
  kind: 'object',
  isList: false,
  isRequired: true,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'user',
  hasDefaultValue: false,
  relationName: 'ProfileTouser',
  relationFromFields: [ 'userId' ],
  relationToFields: [ 'id' ],
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'userId',
  kind: 'scalar',
  isList: false,
  isRequired: true,
  isUnique: true,
  isId: false,
  isReadOnly: true,
  type: 'String',
  hasDefaultValue: false,
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'username',
  kind: 'scalar',
  isList: false,
  isRequired: false,
  isUnique: true,
  isId: false,
  isReadOnly: false,
  type: 'String',
  hasDefaultValue: false,
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'firstName',
  kind: 'scalar',
  isList: false,
  isRequired: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'String',
  hasDefaultValue: false,
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'middleName',
  kind: 'scalar',
  isList: false,
  isRequired: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'String',
  hasDefaultValue: false,
  isGenerated: false,
  isUpdatedAt: false
}
{
  name: 'lastName',
  kind: 'scalar',
  isList: false,
  isRequired: false,
  isUnique: false,
  isId: false,
  isReadOnly: false,
  type: 'String',
  hasDefaultValue: false,
  isGenerated: false,
  isUpdatedAt: false
}
*/