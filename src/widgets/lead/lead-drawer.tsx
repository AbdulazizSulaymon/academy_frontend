import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Spin, Tabs, Table, Tag, Badge, Input, Tooltip, Popconfirm } from 'antd';
import { useApi } from '@src/api';
import { useLocationParams } from '@hooks/use-location-params';
import useLocalizedString from '@src/hooks/use-transform-string';
import { MyDrawer } from '@components/my-drawer';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useNotification } from '@hooks/use-notification';
import { leadsQueryKey } from '@src/queries/models/lead';
import { MdAdd, MdEdit, MdOutlineDelete } from 'react-icons/md';
import AboutLead from './about-lead';
import LeaveComment from './leave-comment';
import LeadHistory from './lead-history';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';
import { useQueryClient } from '@tanstack/react-query';
import { getDeleteSecondaryOptions, getImagePath } from '@utils/util';
import { MediaPreview } from '@src/components/media-preview';
import { AiOutlineQuestionCircle as QuestionCircleOutlined } from 'react-icons/ai';
import { css } from '@emotion/react';
import { useLayoutStore } from '@/stores/layout-store';

const { TextArea } = Input;

interface Order {
  id: string;
  title: string;
  date: string;
  file?: string;
  notes?: string;
  status: 'NeedToOrder' | 'Ordered' | 'Arrived' | 'Canceled';
  createdAt: string;
  updatedAt: string;
}

export const LeadDrawer = observer(() => {
  const { t } = useTranslation();
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const [orderForm] = Form.useForm();
  const api = useApi();
  const [drawerWidth, setDrawerWidth] = useState(1200);
  const { notifySuccess, notifyError } = useNotification();
  const [activeTab, setActiveTab] = useState('1');
  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const { user } = useLayoutStore();
  const queryClient = useQueryClient();
  const [isUpsertOrder, setIsUpsertOrder] = useState(false);

  const { isLoadingOne, dataById } = useCrudModal({
    name: leadsQueryKey,
    model: api.apis.Lead,
    getOne: () =>
      api.apis.Lead.findOne({
        include: {
          specialists: { include: { user: true } },
          leadStatus: true,
          history: {
            include: {
              leadComment: {
                include: {
                  user: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
        },
        where: { id: query.id },
      }),
  });

  const onCancel = () => {
    form.resetFields();
    push(
      {
        query: {
          viewLead: undefined,
          id: undefined,
          viewType: query.viewType || 'kanban',
        },
      },
      { update: true },
    );
  };

  useEffect(() => {
    if (query.viewLead) setDrawerWidth(1200);
  }, [query.viewLead]);

  const getStatusTag = (status: string) => {
    const statusConfig = {
      NeedToOrder: { color: 'warning', text: t('Need to Order') },
      Ordered: { color: 'processing', text: t('Ordered') },
      Arrived: { color: 'success', text: t('Arrived') },
      Canceled: { color: 'error', text: t('Canceled') },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  const tabItems = [
    {
      key: '1',
      label: t('Main Information'),
      children: (
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
          <AboutLead lead={dataById?.data} />
          <div className={'h-full overflow-y-scroll'}>
            <LeaveComment className="mb-6" />
            <LeadHistory />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <MyDrawer
        width={drawerWidth}
        title={
          <div className="flex items-center gap-2">
            <span>{t('View Lead')}</span>
            {dataById?.data?.leadStatus && (
              <Tag color={dataById?.data?.leadStatus?.color}>{t(dataById?.data?.leadStatus?.title)}</Tag>
            )}
          </div>
        }
        onClose={onCancel}
        open={!!query.viewLead}
        extra={
          <div className={'flex gap-2'}>
            <Button onClick={onCancel} type="primary">
              {t('Close')}
            </Button>
          </div>
        }
      >
        {isLoadingOne ? (
          <div className="flex h-full items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Tabs activeKey={activeTab} onChange={setActiveTab} items={tabItems} />
        )}
      </MyDrawer>
    </>
  );
});
