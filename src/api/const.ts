import { fixedConfigInterface } from '@src/types';

export function toCamelCase(s: string) {
  return (
    s
      // @ts-ignore
      .split(' ')
      .map((x: string, i: number) => {
        if (i > 0) return x.charAt(0).toUpperCase() + x.slice(1);
        else return x.charAt(0).toLowerCase() + x.slice(1);
      })
      .join('')
  );
}

export function toPascalCase(s: string) {
  return (
    s
      // @ts-ignore
      .split(' ')
      .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
      .join('')
  );
}

export const replace = (s: any, model: Record<string, unknown> & { name: string }) => {
  if (typeof s == 'string')
    return s
      .replace('NAME_PASCAL', model.name)
      .replace('NAME_CAMEL', toCamelCase(model.name))
      .replace('ENTITY', model.name)
      .replace('CREATE_DTO', `Create${model.name}Dto`)
      .replace('CONNECT_DTO', `Connect${model.name}Dto`)
      .replace('FIND_DTO', `Find${model.name}Dto`)
      .replace('UPDATE_DTO', `Update${model.name}Dto`);
  return s;
};

export const apiCoreFunctions: fixedConfigInterface = {
  count: {
    permission: 'Aggregation',
    body: 'any',
    fixedPath: 'count',
  },
  exist: {
    permission: 'Read',
    body: 'any',
    fixedPath: 'exist',
  },
  findMany: {
    permission: 'Read',
    body: 'any',
    fixedPath: 'find-many',
  },
  findOne: {
    permission: 'Read',
    body: 'any',
    fixedPath: 'find-first',
  },
  createOne: {
    permission: 'Create',
    body: 'any',
    fixedPath: 'create',
  },
  createMany: {
    permission: 'Create',
    body: 'any',
    fixedPath: 'create-many',
  },
  createList: {
    permission: 'Create',
    body: 'any',
    fixedPath: 'create-list',
  },
  updateMany: {
    permission: 'Update',
    body: 'any',
    fixedPath: 'update-many',
  },
  updateList: {
    permission: 'Update',
    body: 'any',
    fixedPath: 'update-list',
  },
  updateOne: {
    permission: 'Update',
    body: 'any',
    fixedPath: 'update',
  },
  deleteMany: {
    permission: 'Delete',
    body: 'any',
    fixedPath: 'delete-many',
  },
  deleteAll: {
    permission: 'Delete',
    fixedPath: 'delete-all',
  },
  deleteOne: {
    permission: 'Delete',
    body: 'any',
    fixedPath: 'delete',
  },
};
