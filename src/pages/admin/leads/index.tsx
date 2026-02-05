import { observer } from 'mobx-react';
import React, { ReactElement, useCallback } from 'react';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { Box } from '@components/box';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { useLeads } from '@src/queries/models/lead';
import { useLeadStatuses } from '@src/queries/models/lead-status';
import { KanbanBoard } from '@/widgets/lead/kanban-board';
import { Button, Form } from 'antd';
import { useLocationParams } from '@src/hooks/use-location-params';
import { LeadDrawer } from '@/widgets/lead/lead-drawer';
import { CreateUpdateLeadDrawer } from '@/widgets/lead/about-lead';
import { SegmentedTab } from '@components/tab';
import { TableLeads } from '@/widgets/lead/table-leads';
import { useTranslation } from 'react-i18next';
import { NextPageWithLayout } from '@/types';

const Page: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { query, push } = useLocationParams();
  const { leadsData, isLoading, isError } = useLeads({
    include: {
      specialists: { include: { user: true } },
      leadStatus: true,
    },
    orderBy: { order: 'desc' },
  });
  const { leadStatusesData } = useLeadStatuses({ orderBy: { order: 'asc' } });
  const createLeadCallback = useCallback(() => push({ query: { createLid: true } }, { update: true }), [push]);

  return (
    <Box className={'h-[100%] overflow-y-auto'}>
      <LeadDrawer />
      {query.createLid && <CreateUpdateLeadDrawer />}
      <div className={'mb-3 flex items-center justify-between gap-2'}>
        <SegmentedTab
          queryName={'viewType'}
          options={[
            {
              label: t('Kanban'),
              value: 'kanban',
            },
            {
              label: t('Table'),
              value: 'table',
            },
          ]}
        />
        <Button type={'primary'} onClick={() => createLeadCallback()}>
          + {t('Add Lead')}
        </Button>
      </div>
      {(!query.viewType || query.viewType === 'kanban') && (
        <KanbanBoard
          leads={leadsData?.data?.data || []}
          statuses={leadStatusesData?.data?.data || []}
          fieldNameForLeadChecking={'leadStatusId'}
        />
      )}
      {query.viewType === 'table' && (
        <TableLeads
          leads={leadsData?.data?.data || []}
          statuses={leadStatusesData?.data?.data || []}
          fieldNameForLeadChecking={'leadStatusId'}
          isLoading={isLoading}
          isError={isError}
          totalCount={(leadsData?.data?.totalCount as number) || 0}
        />
      )}
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

export default Page;
