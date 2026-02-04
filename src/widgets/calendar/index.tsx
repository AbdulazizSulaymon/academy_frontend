import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSetState } from 'ahooks';
import { BadgeProps, Button, CalendarProps, Input, Select, Space, Typography } from 'antd';
import { Badge, Calendar, Modal } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { get, groupBy } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash } from 'react-icons/bs';

import { useApi } from '@src/api';
import { useLayoutStore } from '@src/stores/layout-store';

import { MyDrawer } from '@components/my-drawer';

import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const statuses: Record<string, string> = {
  HIGH: 'error',
  MEDIUM: 'warning',
  LOW: 'success',
};

export const MyCalendar: React.FC = observer(() => {
  const { push } = useLocationParams();
  const api = useApi();
  const [day, setDay] = useState(dayjs());
  const { user } = useLayoutStore();

  const { data } = useQuery(
    ['event-calendar-list', day.format('MM.YYYY')],
    async () => {
      const startDate = dayjs(day).startOf('month');
      const endDate = dayjs(day).endOf('month');
      // const startDate = day.toDate();
      // startDate.setDate(1);
      // startDate.setHours(0, 0, 0, 0);
      // const endDate = day.add(1, 'month').toDate();
      // endDate.setDate(1);
      // endDate.setHours(0, 0, 0, 0);

      const { data } = await api.apis.EventCalendar.findMany({
        where: {
          userId: user?.id,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return groupBy(data?.data, (item) => dayjs(item.date).format('D'));
    },
    {
      enabled: !!day && !!user?.id,
    },
  );

  const monthCellRender = useCallback((value: Dayjs) => {
    return null;

    // const num = getMonthData(value);
    // return num ? (
    //   <div className="notes-month">
    //     <section>{num}</section>
    //     <span>Backlog number</span>
    //   </div>
    // ) : null;
  }, []);

  const dateCellRender = (value: Dayjs) => {
    const listData = get(data, `${value.format('D')}`) || [];
    return (
      <ul className="events" onDoubleClick={() => console.log('d clck')}>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge status={statuses[item.status] as BadgeProps['status']} text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  const onSelect = useCallback(
    (value: Dayjs) => {
      push({ eventModal: true, date: value.format('DD.MM.YYYY') }, { update: true });
      setDay(value);
    },
    [push],
  );

  return (
    <>
      <CalendarStyled cellRender={cellRender} onSelect={onSelect} />
      <EventModal />
    </>
  );
});

const EventModal = observer(() => {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const queries = useLocationParams().query;
  const day = dayjs(queries.date as string, 'DD.MM.YYYY');
  const api = useApi();
  const queryClient = useQueryClient();
  const [value, setValue] = useSetState({ title: '', description: '', status: 'MEDIUM' });
  const { notifySuccess, notifyError } = useNotification();
  const { user } = useLayoutStore();

  const { data } = useQuery(
    ['event-calendar', day.format('DD.MM.YYYY')],
    () => {
      const startDate = day.toDate();
      startDate.setHours(0, 0, 0, 0);
      const endDate = day.add(1, 'day').toDate();
      endDate.setHours(0, 0, 0, 0);

      return api.apis.EventCalendar.findMany({
        where: {
          userId: user?.id,
          date: {
            gte: startDate,
            lt: endDate,
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    },
    {
      enabled: !!day && !!user?.id,
    },
  );

  const {
    mutate: post,
    isLoading,
    isError,
  } = useMutation((data: Record<string, any>) => api.apis.EventCalendar.createOne({ data }), {
    onSuccess: () => {
      setValue({ title: '', description: '', status: 'MEDIUM' });
      notifySuccess("Muvaffaqiyatli qo'shildi");
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'event-calendar' });
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'event-calendar-list' });
      handleCancel();
    },
    onError: () => notifyError("Xatolik sodir bo'ldi"),
  });

  const {
    mutate: remove,
    isLoading: isLoadingRemove,
    isError: isErrorRemove,
  } = useMutation((data: Record<string, any>) => api.apis.EventCalendar.deleteOne({ where: { id: data?.id } }), {
    onSuccess: () => {
      notifySuccess("Muvaffaqiyatli o'chirildi");
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'event-calendar' });
      queryClient.invalidateQueries({ predicate: (query) => query.queryKey[0] === 'event-calendar-list' });
    },
    onError: () => notifyError("Xatolik sodir bo'ldi"),
  });

  const handleOk = () => {
    push({ eventModal: false, date: undefined }, { update: true });
  };

  const handleCancel = () => {
    push({ eventModal: false, date: undefined }, { update: true });
  };

  // const data = [
  //   { type: 'warning', content: 'This is warning event.' },
  //   { type: 'success', content: 'This is usual event.' },
  //   { type: 'error', content: 'This is error event.' },
  // ];

  const removeEvent = () => {};

  const addEvent = () => {
    post({ ...value, date: day.toDate(), userId: user?.id });
  };

  return (
    <MyDrawer title={t('Event Modal') || ''} open={!!queries.eventModal} onClose={handleCancel} width={500}>
      <Typography className={'mb-3'}>{day.format('DD - MMMM YYYY')}</Typography>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          addonBefore={
            <Select
              placeholder="status"
              style={{ width: 130 }}
              options={[
                { label: <Badge status={'error'} text={t('High') || ''} />, value: 'HIGH' },
                { label: <Badge status={'warning'} text={t('Medium') || ''} />, value: 'MEDIUM' },
                { label: <Badge status={'success'} text={t('Low') || ''} />, value: 'LOW' },
              ]}
              value={value.status}
              onChange={(value) => setValue({ status: value })}
            />
          }
          defaultValue=""
          placeholder={t('event') || ''}
          value={value.title}
          onChange={(e) => setValue({ title: e.target.value })}
        />
        <Button type="primary" onClick={addEvent}>
          + {t("Qo'shish") || ''}
        </Button>
      </Space.Compact>
      <ul className="mt-4 mb-2" onDoubleClick={() => console.log('d clck')}>
        {data?.data?.data?.map((item: Record<string, any>) => (
          <li key={item.title} className={'py-1 flex items-center justify-between'}>
            <Badge status={statuses[item.status] as BadgeProps['status']} text={item.title} />
            <Button danger onClick={() => remove(item)}>
              <BsTrash className={''} />
            </Button>
          </li>
        ))}
      </ul>
    </MyDrawer>
  );
});

export const CalendarStyled = styled(Calendar)`
  user-select: none;

  .ant-picker-calendar-header {
    padding-inline: 10px;
  }
`;
