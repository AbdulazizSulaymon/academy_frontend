import * as fs from 'fs';
import * as path from 'path';
import { Model, models } from './models';

console.log('🚀 Query Generator started ...');

export const writeTSFile = (fullPath: string, content: string) => {
  try {
    const dirname = path.dirname(fullPath);
    if (fs.existsSync(dirname) === false) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    fs.writeFileSync(fullPath, content);
    console.log(`🗃writed: ${fullPath}`);
  } catch (e) {
    console.log(e);
  }
};

function toKebabCase(str: string) {
  return str.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();
}

Object.values(models).map((model) => {
  const kebabName = toKebabCase(model.name);
  writeTSFile(`./src/queries/models/${kebabName}.ts`, getContent(model));
});

console.log(`✅ Total Files: ${Object.values(models).length}`);
console.log('✅ Finished');

function getContent({ name, plural, singular }: Model) {
  const pluralKebab = toKebabCase(plural);
  const singularKebab = toKebabCase(singular);
  const pluralCamel = plural[0].toLowerCase() + plural.slice(1);
  const singularCamel = singular[0].toLowerCase() + singular.slice(1);

  const aggregateHook = `
export const ${pluralCamel}AggregateQueryKey = 'aggregate-${pluralKebab}';

export const useAggregate${plural} = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [${pluralCamel}AggregateQueryKey, props],
    queryFn: () => api.instance.post('/api/${singularCamel}/aggregate', props),
    ...options,
  });
  return {
    ...res,
    isLoadingAggregate${name}: res.isLoading,
    isErrorAggregate${name}: res.isError,
    aggregate${plural}: res.data,
  };
};
`;

  return `import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';
import { getQueryOptions, QueryOptions, QuerySecondaryOptions } from '@src/queries';
import { useCallback } from 'react';

export const ${pluralCamel}QueryKey = '${pluralKebab}';
export const ${singularCamel}QueryKey = '${singularKebab}';
export const ${singularCamel}ExistQueryKey = 'exist-${singularKebab}';
export const ${pluralCamel}CountQueryKey = 'count-${pluralKebab}';
${aggregateHook}

export const useCount${plural} = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [${pluralCamel}CountQueryKey, props],
    queryFn: () => api.apis.${name}.count({ ...props }),
    ...options
  });
  return {
    ...res,
    isLoadingCount${name}: res.isLoading,
    isErrorCount${name}: res.isError,
    count${plural}: res.data,
  };
};

export const useExist${singular} = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [${singularCamel}ExistQueryKey, props],
    queryFn: () => api.apis.${name}.exist({ ...props }),
    ...options
  });
  return {
    ...res,
    isLoadingExist${name}: res.isLoading,
    isErrorExist${name}: res.isError,
    exist${singular}: res.data,
  };
};

export const use${plural}WithPagination = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const tableFetchProps = useTableFetchProps();
  const res = useQuery({
    queryKey: [${pluralCamel}QueryKey, tableFetchProps, props],
    queryFn: () =>
      api.apis.${name}.findMany({
        ...tableFetchProps,
        ...props,
      }),
    enabled:
      typeof options.enabled === 'undefined' ? !!tableFetchProps.take : !!options.enabled && !!tableFetchProps.take,
    ...options,
  });

  return { ...res, isLoading${plural}: res.isLoading, isError${plural}: res.isError, ${pluralCamel}Data: res.data };
};

export const use${plural} = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [${pluralCamel}QueryKey, props],
    queryFn: () => api.apis.${name}.findMany({ ...props }),
    enabled: options.enabled != undefined ? !!options.enabled : undefined,
    ...options,
  });
  return { ...res, isLoading${plural}: res.isLoading, isError${plural}: res.isError, ${pluralCamel}Data: res.data };
};

export const use${singular} = (props: Record<string, any>, options: QueryOptions = {}) => {
  const api = useApi();
  const res = useQuery({
    queryKey: [${singularCamel}QueryKey, props],
    queryFn: () => api.apis.${name}.findOne({ ...props }),
    ...(options as any),
  });
  return { ...res, isLoading${singular}: res.isLoading, isError${singular}: res.isError, ${singularCamel}Data: res.data as Record<string, any> | undefined };
};

export const useCreate${plural} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.${name}.createMany({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreate${plural}: res.isPending,
    isErrorCreate${plural}: res.isError,
    create${plural}: res.mutate,
    created${plural}: res.data,
  };
};

export const useCreateList${plural} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.${name}.createList(data);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  return {
    ...res,
    isLoadingCreateList${plural}: res.isPending,
    isErrorCreateList${plural}: res.isError,
    createList${plural}: res.mutate,
    createdList${plural}: res.data,
  };
};

export const useCreate${singular} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (data: Record<string, any>) => {
      return api.apis.${name}.createOne({ data });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingCreate${singular}: res.isPending,
    isErrorCreate${singular}: res.isError,
    create${singular}: res.mutate,
    created${singular}: res.data,
  };
};

export const useUpdate${plural} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.${name}.updateMany(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdate${plural}: res.isPending,
    isErrorUpdate${plural}: res.isError,
    update${plural}: res.mutate,
    updated${plural}: res.data,
  };
};

export const useUpdateList${plural} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.${name}.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdateList${plural}: res.isPending,
    isErrorUpdateList${plural}: res.isError,
    updateList${plural}: res.mutate,
    updatedList${plural}: res.data,
  };
};

export const useUpdate${plural}List = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.${name}.updateList(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdate${plural}List: res.isPending,
    isErrorUpdate${plural}List: res.isError,
    update${plural}List: res.mutate,
    updated${plural}List: res.data,
  };
};

export const useUpdate${singular} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (props: Record<string, any>) => {
      return api.apis.${name}.updateOne(props);
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingUpdate${singular}: res.isPending,
    isErrorUpdate${singular}: res.isError,
    update${singular}: res.mutate,
    updated${singular}: res.data,
  };
};

export const useDelete${plural} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any>) => {
      return api.apis.${name}.deleteMany({ where });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDelete${plural}: res.isPending,
    isErrorDelete${plural}: res.isError,
    delete${plural}: res.mutate,
  };
};

export const useDeleteAll${plural} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: () => {
      return api.apis.${name}.deleteAll();
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });
  return {
    ...res,
    isLoadingDeleteAll${plural}: res.isPending,
    isErrorDeleteAll${plural}: res.isError,
    deleteAll${plural}: res.mutate,
  };
};

export const useDelete${singular} = (options: QueryOptions, secondaryOptions?: QuerySecondaryOptions) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const res = useMutation({
    mutationFn: (where: Record<string, any> | number | string) => {
      return api.apis.${name}.deleteOne(typeof where === 'object' ? { where } : { where: { id: where } });
    },
    ...getQueryOptions(queryClient, options, secondaryOptions),
  });

  const delete${singular}FromTable = useCallback(
    (data: Record<string, any>) => {
      res.mutate({ id: data.id });
    },
    [res.mutate],
  );

  return {
    ...res,
    isLoadingDelete${singular}: res.isPending,
    isErrorDelete${singular}: res.isError,
    delete${singular}: res.mutate,
    delete${singular}FromTable,
  };
};
`;
}

process.exit();
