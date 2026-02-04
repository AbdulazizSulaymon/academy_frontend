import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormInstance } from 'antd/es/form';
import { useEffect, useMemo } from 'react';

import { ApiFunctions } from '@src/types';

import { useNotification } from '@hooks/use-notification';
import { useLocationParams } from '@hooks/use-location-params';

export const useCrudModal = ({
  name,
  model,
  getOne,
  id,
  form,
  onSuccess,
  onError,
  apiProps,
}: {
  name: string;
  model: ApiFunctions;
  getOne?: () => any;
  id?: string | number;
  form?: FormInstance<any>;
  onSuccess?: (data?: Record<string, any>, type?: string) => void;
  onError?: (error?: unknown) => void;
  apiProps?: Record<string, any>;
}) => {
  const { query, push } = useLocationParams();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();

  const { mutate: post, isLoading: isLoadingPost } = useMutation((data: Record<string, any>) => model.createOne(data), {
    onSuccess: (data) => {
      notifySuccess(`Muvaffaqiyatli qo'shildi!`);
      queryClient.invalidateQueries({ queryKey: [name] });
      if (onSuccess) onSuccess(data, 'post');
    },
    onError: (error: Error) => {
      notifyError(error);
      if (onError) onError(error);
    },
  });

  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(
    (values?: Record<string, unknown>) => {
      return model.updateOne(values);
    },
    {
      onSuccess: (data) => {
        notifySuccess(`Muvaffaqiyatli o'zgartirildi!`);
        queryClient.invalidateQueries({ queryKey: [name] });
        if (onSuccess) onSuccess(data, 'update');
      },
      onError: (error: Error) => {
        notifyError(error);
        if (onError) onError(error);
      },
    },
  );

  const {
    data: dataById,
    isLoading: isLoadingOne,
    isError,
  } = useQuery(
    [name, id || query.id],
    getOne ? getOne : () => model.findOne({ where: { id: id || query.id }, ...(apiProps || {}) }),
    {
      enabled: !!(id || query.id),
    },
  );

  const data = useMemo(() => dataById?.data, [dataById?.data]);

  const onCancel = () => {
    if (form) form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      await post({ data: values });
    } else if (query.edit) {
      await update({
        data: { ...values },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  useEffect(() => {
    if (form && query.edit && dataById?.data) form.setFieldsValue(dataById?.data);
  }, [dataById?.data]);

  return {
    isLoadingPost,
    isLoadingUpdate,
    isLoadingOne: isLoadingOne && !!(id || query.id),
    post,
    update,
    dataById,
    data,
    onCancel,
    onFinish,
  };
};
