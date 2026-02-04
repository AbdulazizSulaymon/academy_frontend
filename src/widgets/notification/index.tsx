import { HiDotsVertical as MoreOutlined } from 'react-icons/hi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Badge, Button, Modal, Typography } from 'antd';
import { Bell, Loader2 } from 'lucide-react';

import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { ErrorTitle } from '@src/components/error';
import { SpinLoading } from '@src/components/loading';
import { useStore } from '@src/stores/stores';

import { defaultDateTimeFormat, getImagePath } from '@utils/util';

const Notification = () => {
  const api = useApi();
  const [idNotification, setIdNotification] = useState<number>(0);
  const { user } = useStore().layoutStore;
  const queryClient = useQueryClient();
  const [notificationsId, setNotificationsId] = useState([]);
  const uniqueNotificationsId = Array.from(notificationsId);

  const { data } = useQuery(
    ['notifications-modal', notificationsId],
    () =>
      api.apis.Notifications.findMany({
        where: {
          AND: [
            {
              id: { notIn: uniqueNotificationsId },
            },
          ],
        },
        include: { view: true },
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
    { enabled: false },
  );

  const { data: viewNotificationData } = useQuery(
    ['viewNotification'],
    () =>
      api.apis.ViewNotification.findMany({
        where: { AND: [{ userId: { equals: 10 } }] },
        take: 10,
        orderBy: { createdAt: 'desc' },
      }),
    { enabled: false },
  );

  useEffect(() => {
    viewNotificationData?.data?.data.forEach((v: Record<string, any>) => {
      // @ts-ignore
      setNotificationsId((prev) => new Set([...prev, v.notificationId]));
    });
  }, [viewNotificationData]);

  const {
    data: dataFirst,
    isLoading,
    isError,
  } = useQuery(['notification-modal'], () => api.apis.Notifications.findOne({ where: { id: idNotification } }), {
    enabled: !!idNotification,
  });

  const { mutate, isLoading: isLoadingCreate } = useMutation(
    ({ userId, notificationId }: { userId: number; notificationId: number }) => {
      return api.apis.ViewNotification.createOne({ data: { userId, notificationId } });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications-modal', notificationsId]);
      },
    },
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMore, setIsModalOpenMore] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { t } = useTranslation();

  return (
    <>
      <Badge count={data?.data.totalCount} size="small">
        <div
          onClick={() => {
            if (data?.data.totalCount > 0) showModal();
          }}
          className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
        >
          {isLoadingCreate ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : (
            <Bell className="w-3 h-3" />
          )}
        </div>
      </Badge>

      <Modal
        title={t('Xabarlar') || ''}
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={420}
        style={{ position: 'absolute', right: '0', top: '10px' }}
      >
        {data?.data.data.map((item: Record<string, any>) => {
          return (
            <Fade key={item?.id}>
              <div className="p-2 rounded-md my-3" style={{ border: '1px solid rgba(58, 59, 62, 0.23)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-3 items-center">
                    <Typography className="text-gray-400">{defaultDateTimeFormat(item?.createdAt)}</Typography>
                  </div>

                  <span
                    className="rotate-90 text-[20px] cursor-pointer"
                    onClick={() => {
                      setIsModalOpenMore(true);
                      setIdNotification(item?.id);
                    }}
                  >
                    <MoreOutlined />
                  </span>
                </div>

                <img src={getImagePath(item?.img)} className="w-[100%] h-auto object-cover rounded-t-md mb-3" alt="" />
                <Typography className="text-[16px] font-bold">{item?.title}</Typography>

                <Typography className="text-gray-400">{item?.content}</Typography>

                <div className="text-right">
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsModalOpenMore(true);
                      setIdNotification(item?.id);
                      mutate({ userId: user?.id, notificationId: item.id });
                    }}
                  >
                    {t("Ko'proq") || ''}
                  </Button>
                </div>
              </div>
            </Fade>
          );
        })}
      </Modal>

      {/* Notification one message */}
      <Fade>
        <Modal
          title={t('Xabar') || ''}
          open={isModalOpenMore}
          onOk={() => setIsModalOpenMore(false)}
          onCancel={() => setIsModalOpenMore(false)}
          footer={false}
          width={500}
          style={{ position: 'absolute', right: 'calc(50% - 250px)', top: '10px' }}
        >
          {isLoading && <SpinLoading />}

          {isError && <ErrorTitle />}

          {dataFirst && (
            <div key={dataFirst?.data.id}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-3 items-center">
                  <Typography className="text-gray-400">{defaultDateTimeFormat(dataFirst?.data.createdAt)}</Typography>
                </div>
              </div>
              <img
                src={getImagePath(get(dataFirst, 'data.img', ''))}
                className="w-[100%] h-[350px] object-cover rounded-t-md mb-3"
                alt=""
              />
              <Typography className="text-[16px] font-bold">{dataFirst?.data.title}</Typography>
              <Typography className="text-gray-400">{dataFirst?.data.content}</Typography>
              <div className="text-right">
                <Button type="primary" onClick={() => setIsModalOpenMore(false)}>
                  Ok
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </Fade>
    </>
  );
};

export default Notification;
