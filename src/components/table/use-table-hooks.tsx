import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TableProps } from 'antd';
import { useCallback } from 'react';

import { useApi } from '@src/api';
import { ApiFunctions } from '@src/types';

import { useNotification } from '@hooks/use-notification';
import { useLocationParams } from '@hooks/use-location-params';

export const useTableHooks = ({ name = '', model }: { name?: string; model?: ApiFunctions }) => {
  const {
    query: { field, order },
    push,
  } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();

  const onChange: TableProps<object>['onChange'] = (pagination, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    // @ts-ignore
    if (field !== sorter.columnKey || order !== sorter.order)
      push(
        // @ts-ignore
        { field: sorter.order ? sorter.columnKey : undefined, order: sorter.order, pageNumber: 1 },
        { update: true },
      );
  };

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    [`delete-${name}`],
    (id: number) => (model ? model.deleteOne({ where: { id } }) : new Promise((resolve, reject) => resolve(undefined))),
    {
      onSuccess: () => {
        if (!model) return;
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['fuel-types'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );

  const addCallback = useCallback(() => push({ add: true }), []);
  const editCallback = useCallback((data: Record<string, any>) => push({ edit: true, id: data.id }), []);

  return { onChange, addCallback, editCallback, remove, isLoadingRemove };
};
