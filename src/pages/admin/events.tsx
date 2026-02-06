import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { useEvents, eventsQueryKey } from '@src/queries/models/event';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { AutoForm, FormField } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';

import { AcademyEventStatus } from '@api/academy-types';

const EventsPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('Title Uz') || 'Title Uz',
        dataIndex: 'titleUz',
        key: 'titleUz',
        width: 200,
      },
      {
        title: t('Title Ru') || 'Title Ru',
        dataIndex: 'titleRu',
        key: 'titleRu',
        width: 200,
      },
      {
        title: t('Title En') || 'Title En',
        dataIndex: 'titleEn',
        key: 'titleEn',
        width: 200,
      },
      {
        title: t('Start Date') || 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate',
        render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
        width: 150,
      },
      {
        title: t('End Date') || 'End Date',
        dataIndex: 'endDate',
        key: 'endDate',
        render: (date: string) => (date ? dayjs(date).format('DD.MM.YYYY HH:mm') : '-'),
        width: 150,
      },
      {
        title: t('Location') || 'Location',
        dataIndex: 'location',
        key: 'location',
        width: 150,
        render: (value: string, record: any) => (record.isOnline ? t('Online') || 'Online' : value || '-'),
      },
      {
        title: t('Status') || 'Status',
        dataIndex: 'status',
        key: 'status',
        width: 120,
        render: (status: AcademyEventStatus) => {
          const statusColors: Record<AcademyEventStatus, string> = {
            [AcademyEventStatus.Expected]: 'blue',
            [AcademyEventStatus.OnGoing]: 'green',
            [AcademyEventStatus.Completed]: 'gray',
            [AcademyEventStatus.Canceled]: 'red',
          };
          return status;
        },
      },
      {
        title: t('Max Participants') || 'Max Participants',
        dataIndex: 'maxParticipants',
        key: 'maxParticipants',
        width: 130,
        render: (value: number) => value || '-',
      },
      {
        title: t('Created At') || 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
        width: 150,
      },
    ],
    [t],
  );

  const tableFetchProps = useTableFetchProps();
  const { data, isLoading, isError } = useEvents(
    { ...tableFetchProps },
    { enabled: !!tableFetchProps.take },
  );

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.id }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationKey: [eventsQueryKey],
    mutationFn: (data: Record<string, any>) => api.apis.Event.deleteOne({ where: { id: data.id } }),
    onSuccess: () => {
      notifySuccess('Successfully deleted!');
      queryClient.invalidateQueries({ queryKey: [eventsQueryKey] });
    },
  });

  return (
    <Box>
      <ItemModal />
      <Table
        name="Events"
        queryKey={[eventsQueryKey]}
        dataSource={data?.data?.data || []}
        columns={columns}
        size="small"
        loading={isLoading}
        total={get(data, 'data.totalCount', 0)}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={remove}
        error={isError}
      />
    </Box>
  );
});

const ItemModal = observer(() => {
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const { t } = useTranslation();

  const {
    isLoadingOne,
    data,
    post: create,
    update,
    isLoadingPost,
    isLoadingUpdate,
  } = useCrudModal({
    name: 'events',
    model: api.apis.Event,
    form: form,
    getOne: () =>
      api.apis.Event.findOne({
        where: { id: query.id },
      }),
  });

  const onCancel = () => {
    form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  const onFinish = async (values: any) => {
    if (query.add) {
      await create({
        data: {
          titleUz: values.titleUz,
          titleRu: values.titleRu,
          titleEn: values.titleEn,
          descriptionUz: values.descriptionUz,
          descriptionRu: values.descriptionRu,
          descriptionEn: values.descriptionEn,
          coverImage: values.coverImage,
          startDate: values.startDate,
          endDate: values.endDate,
          location: values.location,
          isOnline: values.isOnline || false,
          meetingLink: values.meetingLink,
          status: values.status || AcademyEventStatus.Expected,
          maxParticipants: values.maxParticipants,
          userId: values.userId || 'system',
        },
      });
    } else if (query.edit) {
      await update({
        data: {
          titleUz: values.titleUz,
          titleRu: values.titleRu,
          titleEn: values.titleEn,
          descriptionUz: values.descriptionUz,
          descriptionRu: values.descriptionRu,
          descriptionEn: values.descriptionEn,
          coverImage: values.coverImage,
          startDate: values.startDate,
          endDate: values.endDate,
          location: values.location,
          isOnline: values.isOnline,
          meetingLink: values.meetingLink,
          status: values.status,
          maxParticipants: values.maxParticipants,
        },
        where: {
          id: data?.id,
        },
      });
    }
  };

  const fields: FormField[] = [
    {
      label: t('Title Uz') || 'Title Uz',
      name: 'titleUz',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Title Ru') || 'Title Ru',
      name: 'titleRu',
    },
    {
      label: t('Title En') || 'Title En',
      name: 'titleEn',
    },
    {
      label: t('Description Uz') || 'Description Uz',
      name: 'descriptionUz',
      type: 'textarea',
    },
    {
      label: t('Description Ru') || 'Description Ru',
      name: 'descriptionRu',
      type: 'textarea',
    },
    {
      label: t('Description En') || 'Description En',
      name: 'descriptionEn',
      type: 'textarea',
    },
    {
      label: t('Cover Image') || 'Cover Image',
      name: 'coverImage',
      type: 'file',
      accept: 'image/*',
      listType: 'picture-card',
    },
    {
      label: t('Start Date') || 'Start Date',
      name: 'startDate',
      type: 'datepicker',
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('End Date') || 'End Date',
      name: 'endDate',
      type: 'datepicker',
    },
    {
      label: t('Location') || 'Location',
      name: 'location',
    },
    {
      label: t('Is Online') || 'Is Online',
      name: 'isOnline',
      type: 'switch',
    },
    {
      label: t('Meeting Link') || 'Meeting Link',
      name: 'meetingLink',
    },
    {
      label: t('Status') || 'Status',
      name: 'status',
      type: 'select',
      options: [
        { label: t('Expected') || 'Expected', value: AcademyEventStatus.Expected },
        { label: t('On Going') || 'On Going', value: AcademyEventStatus.OnGoing },
        { label: t('Completed') || 'Completed', value: AcademyEventStatus.Completed },
        { label: t('Canceled') || 'Canceled', value: AcademyEventStatus.Canceled },
      ],
      rules: [{ required: true, message: t('This field is required') || 'This field is required' }],
    },
    {
      label: t('Max Participants') || 'Max Participants',
      name: 'maxParticipants',
      type: 'number',
    },
  ];

  return (
    <MyDrawer
      title={`${query.add ? t('Add') || 'Add' : t('Edit') || 'Edit'} ${
        query.add ? t('Event') || 'Event' : ''
      }`}
      open={query.add || query.edit}
      onClose={onCancel}
      extra={[
        <Button key="save" type="primary" loading={isLoadingPost || isLoadingUpdate} onClick={() => form.submit()}>
          {t('Save') || 'Save'}
        </Button>,
      ]}
      width={600}
    >
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingPost || isLoadingUpdate}
        columnSize={1}
        hideButtons
        loading={isLoadingOne}
      />
    </MyDrawer>
  );
});

EventsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Events">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default EventsPage;
