import { NextPageWithLayout } from '@/types';
import { Button, Modal, Typography } from 'antd';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useMemo } from 'react';
import type { ReactElement } from 'react';

import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { SpinLoading } from '@components/loading';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { join } from '@fireflysemantics/join';
import { AiOutlineEye } from 'react-icons/ai';
import { BsChatLeftText } from 'react-icons/bs';
import { Link } from '@components/link';
import {
  errorLogsQueryKey,
  useDeleteErrorLog,
  useErrorLog,
  useErrorLogsWithPagination,
} from '@src/queries/models/error-log';
import { useLocationParams } from '@hooks/use-location-params';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { useTranslation } from 'react-i18next';

const Page: NextPageWithLayout = observer(function Home() {
  const { push } = useLocationParams();
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t(`Text`) || '',
        dataIndex: 'text',
        key: 'text',
        width: 160,
      },
      {
        title: t(`Description`) || '',
        dataIndex: 'desc',
        key: 'desc',
        render: (value: string) => value?.slice(0, 50) + (value?.length > 50 && '...'),
        width: 220,
      },
      {
        title: t(`Path`) || '',
        dataIndex: 'path',
        key: 'path',
        render: (value: string) => (
          <Link href={join(origin, value)} target>
            {value}
          </Link>
        ),
        width: 200,
      },
    ],
    [t],
  );

  const { data, isLoadingErrorLogs, isErrorErrorLogs } = useErrorLogsWithPagination({});
  const { deleteErrorLog } = useDeleteErrorLog(
    {},
    {
      invalidateQueries: [errorLogsQueryKey],
      successToast: 'Deleted successfully!',
      errorToast: 'An error occurred!',
    },
  );
  const view = useCallback((data: Record<string, any>) => push({ id: data.id }, { update: true }), [push]);

  return (
    <Box>
      <ViewModal />
      <Table
        name={'AdminErrorLogs'}
        queryKey={[errorLogsQueryKey]}
        dataSource={data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoadingErrorLogs}
        error={isErrorErrorLogs}
        total={get(data, 'data.totalCount', 0)}
        add={false}
        editButton={false}
        removeCallback={(record) => deleteErrorLog({ id: record.id })}
        operations={[
          (data) => (
            <Button
              onClick={() => {
                view(data.record);
              }}
              type={'text'}
              size={'small'}
            >
              <AiOutlineEye />
            </Button>
          ),
        ]}
      />
    </Box>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

const ViewModal = observer(() => {
  const { query, push } = useLocationParams();

  const { data, isLoading } = useErrorLog({ where: { id: query.id } }, { enabled: !!query.id });

  return (
    <Modal
      title={`Error Log`}
      open={query.id}
      onCancel={() => push({ id: undefined }, { update: true })}
      footer={[]}
      width={900}
    >
      {isLoading && <SpinLoading />}
      <div className={'border border-solid border-gray-200 dark:border-gray-700 p-3 mb-2 rounded'}>
        <span className={'flex items-center gap-2'}>
          <BsChatLeftText className={'text-yellow-500'} /> <span>Text:</span>
        </span>
        {data?.data?.text}
      </div>
      {data?.data?.desc && (
        <div className={'border border-solid border-gray-200 dark:border-gray-700 p-3 mb-2 rounded'}>
          <span className={'flex items-center gap-2'}>
            <BsChatLeftText className={'text-yellow-500'} /> <span>Description:</span>
          </span>
          {data?.data?.desc?.split('\n').map((item: string, index: number) => (
            <Typography key={index}>
              {index + 1}. {item}
            </Typography>
          ))}
        </div>
      )}
    </Modal>
  );
});

export default Page;
