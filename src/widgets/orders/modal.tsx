import { AutoForm } from '@components/form/auto-form';
import { useApi } from '@src/api';
import { useQuery } from '@tanstack/react-query';
import { Form, Modal } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import { SpinLoading } from '@components/loading';
import { useLocationParams } from '@hooks/use-location-params';
import { orderGroupsQueryKey, useUpdateOrderGroup } from '@src/queries/models/order-group';
import { useTranslation } from 'react-i18next';

export const EditOrderModal = observer(() => {
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const { t } = useTranslation();

  const {
    data: dataById,
    isLoading,
    isError,
  } = useQuery(['order-group', query.orderId], () => api.apis.OrderGroup.findOne({ where: { id: query.orderId } }), {
    enabled: !!query.orderId,
  });

  const { updateOrderGroup, isLoadingUpdateOrderGroup } = useUpdateOrderGroup(
    {},
    {
      invalidateQueries: [orderGroupsQueryKey],
      successToast: t("Muvaffaqiyatli o'zgartirildi"),
      errorToast: t("Xatolik sodir bo'ldi"),
    },
  );

  const onCancel = () => {
    form.resetFields();
    push({ editOrder: undefined, orderId: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    const data = { data: values, where: { id: dataById?.data.id } };
    await updateOrderGroup(data);
  };

  useEffect(() => {
    if (dataById?.data) form.setFieldsValue(dataById?.data);
  }, [dataById?.data]);

  const fields = useMemo(() => [{ label: 'Izoh', name: 'description', type: 'textarea' }], [dataById?.data]);

  return (
    <Modal title={`Buyurtmani tahrirlash`} open={!!query.editOrder} onCancel={onCancel} footer={[]}>
      {isLoading && <SpinLoading />}
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingUpdateOrderGroup}
      />
    </Modal>
  );
});
