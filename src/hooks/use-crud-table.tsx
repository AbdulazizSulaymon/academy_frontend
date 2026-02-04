import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormInstance } from 'antd/es/form';

import { ApiFunctions } from '@src/types';
import { useNotification } from '@hooks/use-notification';

export const useCrudTable = ({
  name,
  model,
  onSuccess,
  onError,
}: {
  name: string;
  model: ApiFunctions;
  getOne?: () => any;
  id?: number;
  form?: FormInstance<any>;
  onSuccess?: (data?: Record<string, any>) => void;
  onError?: (error?: unknown) => void;
}) => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();

  const { mutate: post, isLoading: isLoadingPost } = useMutation((data: Record<string, any>) => model.createOne(data), {
    onSuccess: (data) => {
      notifySuccess('Added successfully!');
      queryClient.invalidateQueries({ queryKey: [name] });
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      // @ts-ignore
      notifyError((typeof error?.response?.data === 'string' && error?.response?.data) || 'An error occurred!');
      if (onError) onError(error);
    },
  });

  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(
    (values?: Record<string, unknown>) => {
      return model.updateOne(values);
    },
    {
      onSuccess: (data) => {
        notifySuccess('Changed successfully!');
        queryClient.invalidateQueries({ queryKey: [name] });
        if (onSuccess) onSuccess(data);
      },
      onError: (error) => {
        notifyError('An error occurred!');
        if (onError) onError(error);
      },
    },
  );

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    (values?: Record<string, unknown>) => {
      return model.deleteOne(values);
    },
    {
      onSuccess: (data) => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: [name] });
        if (onSuccess) onSuccess(data);
      },
      onError: (error) => {
        notifyError('An error occurred!');
        if (onError) onError(error);
      },
    },
  );

  const onFinish = async (values: any, id: any) => {
    if (!id) {
      await post({ data: values });
    } else {
      await update({
        data: { ...values },
        where: {
          id,
        },
      });
    }
  };

  const deleteOne = async (id: any) => {
    if (id) remove({ where: { id } });
  };

  return {
    isLoadingPost,
    isLoadingUpdate,
    isLoadingRemove,
    post,
    update,
    remove,
    deleteOne,
    onFinish,
  };
};
