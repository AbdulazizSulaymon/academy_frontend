import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';
import { useLocationParams } from '@hooks/use-location-params';
import { getUserFullName, getImagePath } from '@utils/util';
import { leadsQueryKey } from '@src/queries/models/lead';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Lead, LeadStatus } from '@src/types/lead';
import { Tag, Tooltip, Space, Avatar, Badge, Select, message } from 'antd';
import { MdPhone, MdAccessTime, MdCalendarToday, MdCheckCircle } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@src/api';
import { useUserMe } from '@hooks/use-user-me';
import { css } from '@emotion/react';

dayjs.extend(relativeTime);

interface Props {
  leads: Lead[];
  statuses: LeadStatus[];
  fieldNameForLeadChecking: string;
  isLoading?: boolean;
  isError?: boolean;
  totalCount?: number;
}

export const TableLeads = observer(
  ({ leads, statuses, fieldNameForLeadChecking, isLoading, isError, totalCount }: Props) => {
    const { push } = useLocationParams();
    const { t } = useTranslation();
    const api = useApi();
    const queryClient = useQueryClient();
    const { user } = useUserMe();

    const { mutate: updateStatus, isLoading: isUpdatingStatus } = useMutation({
      mutationFn: (data: { leadId: string; newStatusId: string }) =>
        api.apis.Lead.updateOne({
          where: { id: data.leadId },
          data: {
            leadStatus: { connect: { id: data.newStatusId } },
            statusUpdatedAt: new Date(),
          },
        }),
      onSuccess: () => {
        message.success(t('Status changed successfully'));
        queryClient.invalidateQueries({ queryKey: [leadsQueryKey] });
      },
      onError: () => {
        message.error(t('An error occurred'));
      },
    });

    const viewCallback = (lead: Record<string, any>) => {
      push({ query: { viewLead: true, id: lead.id } }, { update: true });
    };

    // Get status color based on days
    const getDaysColor = (date: string) => {
      const days = dayjs().diff(dayjs(date), 'day');
      if (days <= 1) return 'success';
      if (days <= 3) return 'warning';
      if (days <= 7) return 'orange';
      return 'error';
    };

    // Handle status change
    const handleStatusChange = (leadId: string, newStatusId: string) => {
      updateStatus({
        leadId,
        newStatusId,
      });
    };

    const columns = useMemo(
      () => [
        numericColumn(),
        {
          title: t('Title'),
          dataIndex: 'title',
          key: 'title',
          width: 200,
          ellipsis: true,
          render: (text: string, record: Lead) => (
            <Tooltip title={text || t('Untitled Lead')}>
              <span
                className="cursor-pointer font-medium text-blue-600 hover:text-blue-800"
                onClick={() => viewCallback(record)}
              >
                {text || t('Untitled Lead')}
              </span>
            </Tooltip>
          ),
        },
        {
          title: t('Phone'),
          dataIndex: ['data', 'phone'],
          key: 'phone',
          width: 130,
          render: (phone: string) =>
            phone ? (
              <Space size={4}>
                <MdPhone size={14} className="text-gray-500" />
                <span>{phone}</span>
              </Space>
            ) : (
              <span className="text-gray-400">-</span>
            ),
        },
        {
          title: t('Email'),
          dataIndex: ['data', 'email'],
          key: 'email',
          width: 180,
          ellipsis: true,
          render: (email: string) =>
            email ? (
              <span className="text-sm">{email}</span>
            ) : (
              <span className="text-gray-400">-</span>
            ),
        },
        {
          title: t('Status'),
          key: 'status',
          width: 200,
          render: (_: unknown, record: Lead) => (
            <Space
              direction="vertical"
              size={4}
              style={{ width: '100%' }}
              css={css`
                .ant-select-selector {
                  padding-inline: 0 !important;
                }
                .ant-select-arrow {
                  display: none;
                }
              `}
            >
              <Select
                value={record.leadStatusId}
                onChange={(value) => handleStatusChange(record.id, value)}
                loading={isUpdatingStatus}
                style={{ width: '100%' }}
                size="small"
                onClick={(e) => e.stopPropagation()}
                variant={'borderless'}
              >
                {statuses.map((status) => (
                  <Select.Option key={status.id} value={status.id}>
                    <Tag color={status.color || 'default'} style={{ margin: 0 }}>
                      {t(status.title as string)}
                    </Tag>
                  </Select.Option>
                ))}
              </Select>
            </Space>
          ),
        },
        {
          title: t('Location'),
          dataIndex: 'location',
          key: 'location',
          width: 120,
          render: (url: string) =>
            url ? (
              <Link href={url} target={'_blank'}>
                {t('Link')}
              </Link>
            ) : (
              <span className="text-gray-400">-</span>
            ),
        },
        {
          title: t('Responsible Specialists'),
          key: 'assignees',
          width: 150,
          render: (_: unknown, record: Lead) => (
            <Space size={4}>
              {record.specialists && record.specialists.length > 0 && (
                <Avatar.Group
                  maxCount={2}
                  size={24}
                  maxStyle={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                    fontSize: '11px',
                  }}
                >
                  {record.specialists.map((specialist: any) => (
                    <Tooltip
                      key={specialist.id}
                      title={`${t('Specialist')}: ${getUserFullName(specialist?.user || specialist)}`}
                    >
                      <Avatar
                        src={specialist?.user?.photo && getImagePath(specialist.user.photo)}
                        style={{ backgroundColor: '#87d068' }}
                      >
                        {!specialist?.user?.photo && (specialist?.user?.firstName?.[0] || 'S')}
                      </Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
              )}

              {(!record.specialists || record.specialists.length === 0) && (
                <span className="text-xs text-gray-400">{t('Not assigned to anyone')}</span>
              )}
            </Space>
          ),
        },
        {
          title: t('Next Call Date'),
          dataIndex: 'nextCallDate',
          key: 'nextCallDate',
          width: 140,
          render: (date: string) =>
            date ? (
              <Tooltip title={dayjs(date).format('DD.MM.YYYY HH:mm')}>
                <Tag icon={<MdCalendarToday size={12} />}>{dayjs(date).format('DD.MM.YYYY')}</Tag>
              </Tooltip>
            ) : (
              <span className="text-gray-400">-</span>
            ),
        },
        {
          title: t('Created'),
          dataIndex: 'createdAt',
          key: 'createdAt',
          width: 120,
          sorter: true,
          render: (date: string) => {
            const daysAgo = dayjs().diff(dayjs(date), 'day');
            return (
              <Tooltip title={dayjs(date).format('MM/DD/YYYY HH:mm')}>
                <Tag
                  color={getDaysColor(date)}
                  icon={<MdAccessTime size={12} />}
                  className={'inline-flex items-center gap-1'}
                >
                  {daysAgo === 0 ? t('Today') : `${daysAgo} ${t('days')}`}
                </Tag>
              </Tooltip>
            );
          },
        },
        {
          title: t('Last Updated'),
          dataIndex: 'statusUpdatedAt',
          key: 'statusUpdatedAt',
          width: 140,
          sorter: true,
          render: (date: string) =>
            date ? (
              <Tooltip title={dayjs(date).format('MM/DD/YYYY HH:mm')}>
                <span className="text-xs text-gray-500">{dayjs(date).fromNow()}</span>
              </Tooltip>
            ) : (
              <span className="text-gray-400">-</span>
            ),
        },
        {
          title: t('Comment'),
          dataIndex: 'comment',
          key: 'comment',
          width: 200,
          ellipsis: true,
          render: (comment: string) =>
            comment ? (
              <Tooltip title={comment}>
                <span className="text-xs text-gray-600">{comment}</span>
              </Tooltip>
            ) : (
              <span className="text-gray-400">-</span>
            ),
        },
      ],
      [t, getDaysColor, statuses, isUpdatingStatus, handleStatusChange]
    );

    return (
      <>
        <Table
          name={'leads'}
          queryKey={[leadsQueryKey]}
          dataSource={leads as Record<string, any>[]}
          columns={columns}
          size={'small'}
          loading={isLoading}
          error={isError}
          total={totalCount || 0}
          hidePagination={false}
          editButton={false}
          removeButton={false}
          hideOperationColumn
          rowClassName={(record: Record<string, any>) =>
            'hover:bg-gray-50 cursor-pointer transition-colors'
          }
          onRow={(record) => ({
            onClick: (e) => {
              if (!(e.target as HTMLElement).closest('.ant-select')) {
                viewCallback(record);
              }
            },
          })}
        />
      </>
    );
  }
);
