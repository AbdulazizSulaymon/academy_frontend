import { useQuery } from '@tanstack/react-query';
import { Button, Form, Tag, Typography } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { partnersQueryKey, usePartners } from '@src/queries/models/partner';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { Box } from '@components/box';
import { AutoForm, FormField } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';
import { useTableFunctions } from '@hooks/use-table-functions';
import { defaultDateTimeFormat, getUserFullName, makeOptions } from '@utils/util';
import { usersQueryKey } from '@src/queries/models/user';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useNotification } from '@hooks/use-notification';

const Page: NextPageWithLayout = observer(() => {
  const api = useApi();
  const { t } = useTranslation();

  const { data, isLoading, isError } = usePartners({
    orderBy: [{ createdAt: 'desc' }],
    include: { user: true },
  });

  const { addCallback, editCallback, removeCallback } = useTableFunctions(api.apis.Partner, partnersQueryKey);

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Foydalanuvchi`) || '',
        dataIndex: '',
        key: 'firstName',
        render: (item: Record<string, any>) => {
          return <Typography className={'flex items-center'}>{getUserFullName(item?.user || {})}</Typography>;
        },
        width: 140,
      },
      {
        title: t('Referal kod'),
        dataIndex: 'referralCode',
        key: 'referralCode',
      },
      {
        title: t('Kirishlar'),
        dataIndex: 'totalClicks',
        key: 'totalClicks',
      },
      {
        title: t("Ro'yxatdan o'tganlar"),
        dataIndex: 'totalSignups',
        key: 'totalSignups',
      },
      {
        title: t('Sotib olganlar'),
        dataIndex: 'totalRevenue',
        key: 'totalRevenue',
      },
      {
        title: t(`Status`) || '',
        dataIndex: 'isActive',
        key: 'isActive',
        width: 140,
        render: (isActive: boolean) => {
          return <Tag color={isActive ? 'success' : 'warning'}>{isActive ? 'Active' : 'No Active'}</Tag>;
        },
      },
      {
        title: t(`Phone number`) || '',
        dataIndex: '',
        key: 'phone',
        width: 190,
        render: (item: Record<string, any>) => {
          return <Typography>{item?.user?.phone !== null ? item?.user?.phone : ''}</Typography>;
        },
      },
      {
        title: t('CreatedAt'),
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (value: string) => defaultDateTimeFormat(value),
      },
    ],
    [t],
  );

  return (
    <>
      <Box>
        <Table
          name={'AdminPartners'}
          queryKey={[partnersQueryKey]}
          dataSource={data?.data?.data}
          columns={columns}
          size={'small'}
          loading={isLoading}
          error={isError}
          total={get(data, 'data.totalCount', 0)}
          addCallback={addCallback}
          editCallback={editCallback}
          removeCallback={removeCallback}
        />
        <EditModal />
      </Box>
    </>
  );
});

const EditModal = () => {
  const api = useApi();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { query } = useLocationParams();
  const { notifySuccess, notifyError } = useNotification();

  const { data: userData } = useQuery({
    queryKey: [usersQueryKey],
    queryFn: () =>
      api.apis.User.findMany({ select: { firstName: true, lastName: true, phone: true, id: true } }),
  });

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById, onCancel } = useCrudModal({
    form,
    name: partnersQueryKey,
    model: api.apis.Partner,
  });

  const fields = useMemo(
    () => [
      {
        label: t('Foydalanuvchi') || '',
        name: 'userId',
        options: makeOptions(
          userData?.data?.data,
          (user: Record<string, any>) => `${getUserFullName(user)} ${user.phone || ''}`,
        ),
        rules: [{ required: true }],
        readOnly: !!query.edit,
      },
      {
        label: t('Referal kod'),
        name: 'referralCode',
        rules: [{ required: true }],
      },
      {
        label: t('Status') || '',
        name: 'isActive',
        options: [
          { label: t('Active') || '', value: true },
          { label: t('No Active') || '', value: false },
        ],
        rules: [{ required: true }],
      },
    ],
    [userData?.data?.data, query.edit, t],
  );

  const onFinish = async (values: Record<string, any>) => {
    if (query.add) {
      post({ data: { ...values } });
    } else if (query.edit) {
      update({
        data: { ...values },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  useEffect(() => {
    if (dataById?.data) form.setFieldsValue(dataById?.data);
  }, [dataById?.data]);

  const refLink = useMemo(() => {
    return `https://osonsotuv.uz?ref=${dataById?.data?.referralCode}&utm_source=${dataById?.data?.referralCode}`;
  }, [dataById?.data?.referralCode]);

  return (
    <>
      <MyDrawer
        title={query.add ? t('Add') : t('Edit')}
        open={query.add || query.edit}
        onClose={onCancel}
        extra={[
          <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
            {t('Saqlash')}
          </Button>,
        ]}
        width={550}
      >
        <AutoForm
          form={form}
          fields={fields}
          onCancel={onCancel}
          onFinish={onFinish}
          isSaveLoading={isLoadingPost || isLoadingUpdate}
          hideButtons={true}
          loading={isLoadingOne}
        />
        {query.edit && (
          <div className={'mt-4'}>
            <div className={'flex items-center justify-between'}>
              <Typography className={'font-bold'}>Referal havola</Typography>
              <Button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(refLink);
                    notifySuccess(`Referal havoladan nusxa olindi!`);
                  } catch {
                    notifyError(`Nusxa olishda xatolik sodir bo'ldi!`);
                  }
                }}
                type={'text'}
              >
                <MdOutlineContentCopy />
              </Button>
            </div>
            <Typography className={'font-mono'}>{refLink}</Typography>
          </div>
        )}
      </MyDrawer>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
