import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiFunctions } from '@src/types';
import { useNotification } from '@hooks/use-notification';
import { useTranslation } from 'react-i18next';
import { useLocationParams } from '@hooks/use-location-params';

export const useTableFunctions = (
  model?: ApiFunctions,
  queryKey?: string,
  removeCallbackOptions?: { successText?: string | null; errorText?: string | null },
) => {
  const { push } = useLocationParams();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();
  const { t } = useTranslation();

  const addCallback = useCallback(
    (queries: Record<any, any> = { add: true }) => {
      if (queries.type == 'click') queries = { add: true };
      return push({ ...queries }, { update: true });
    },
    [push],
  );

  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const viewCallback = useCallback(
    (data: Record<string, any>) => push({ view: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: removeCallback, isLoading: isLoadingRemove } = useMutation(
    (data: Record<string, any>) =>
      model
        ? model?.deleteOne({ where: { id: data.id } })
        : new Promise((resolve, reject) => {
            new Error('Model not found');
            reject();
          }),
    {
      onSuccess: () => {
        notifySuccess(t(removeCallbackOptions?.successText || `Muvaffaqiyatli o'chirildi`) as string);
        if (queryKey) queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
      onError: () => notifyError(t(removeCallbackOptions?.errorText || 'Xatolik yuz berdi') as string),
    },
  );

  return { addCallback, editCallback, viewCallback, removeCallback, isLoadingRemove };
};
