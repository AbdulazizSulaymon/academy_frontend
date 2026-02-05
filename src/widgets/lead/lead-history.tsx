import ShowFile from '@components/show-file';
import { css } from '@emotion/react';
import { useFormatDate } from '@hooks/use-format-date';
import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';
import { leadHistoriesQueryKey, useLeadHistories, useUpdateLeadHistory } from '@src/queries/models/lead-history';
import { useQueryClient } from '@tanstack/react-query';
import { getImagePath, getUserFullName } from '@utils/util';
import { Tag, Timeline, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoChatbox, IoInformationOutline } from 'react-icons/io5';
import { useMyTheme } from '@hooks/use-my-theme';

const LeadHistory = () => {
  const { formatDate } = useFormatDate();
  const { t } = useTranslation();
  const { query, push } = useLocationParams();
  const [comments, setComments] = useState<any[]>([]);
  const { isDarkMode } = useMyTheme();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();

  const { leadHistoriesData } = useLeadHistories({
    include: {
      lead: {
        select: {
          data: true,
        },
      },
      leadComment: {
        include: {
          user: true,
        },
      },
      leadStatusHistory: {
        include: {
          user: true,
          leadStatusTo: true,
          leadStatusFrom: true,
        },
      },
    },
    where: {
      leadId: query.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });

  const { updateLeadHistory } = useUpdateLeadHistory({
    onSuccess: () => {
      notifySuccess(t('Successfully updated!'));
      queryClient.invalidateQueries({ queryKey: [leadHistoriesQueryKey] });
    },
    onError: (error: Error) => {
      notifyError(error);
    },
  });

  // Helper function to get user display info
  const getUserDisplayInfo = (user: any) => {
    if (!user) return { name: 'System', avatar: null };

    const fullName = getUserFullName(user);
    const avatar = user?.photo || user.photo;

    return {
      name: fullName || 'Unknown User',
      avatar: avatar ? getImagePath(avatar) : null,
    };
  };

  useEffect(() => {
    setComments(
      leadHistoriesData?.data.data
        .map((item: any, index: number) => {
          // Comment Type
          if (item.type === 'Comment') {
            const userInfo = getUserDisplayInfo(item.leadComment?.user);

            return {
              children: (
                <div
                  className={`rounded-lg border px-4 py-3 shadow-sm ${
                    isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-blue-100 bg-blue-50'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {userInfo.avatar ? (
                        <Avatar size={24} src={userInfo.avatar} className="flex-shrink-0" />
                      ) : (
                        <Avatar size={24} className="flex-shrink-0 bg-primary">
                          {userInfo.name.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {userInfo.name}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <div className={`mb-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    {item.leadComment.text}
                  </div>

                  {item.leadComment.file && (
                    <div className="mt-3">
                      <ShowFile fileUrl={item.leadComment.file} />
                    </div>
                  )}
                </div>
              ),
              dot: (
                <div className="grid p-2 place-items-center rounded-full bg-primary shadow-md">
                  <IoChatbox className="text-white" size={16} />
                </div>
              ),
            };
          }

          // Status Type
          if (item.type === 'Status') {
            const userInfo = getUserDisplayInfo(item.LeadStatusHistory?.user);

            return {
              children: (
                <div
                  className={`rounded-lg border px-4 py-3 shadow-sm ${
                    isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-green-100 bg-green-50'
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {userInfo.avatar ? (
                        <Avatar size={24} src={userInfo.avatar} className="flex-shrink-0" />
                      ) : (
                        <Avatar size={24} className="flex-shrink-0 bg-green-500">
                          {userInfo.name.charAt(0).toUpperCase()}
                        </Avatar>
                      )}
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        {userInfo.name}
                      </span>
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  <p className={`mb-3 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t('Status Changed')}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.LeadStatusHistory?.leadStatusFrom && (
                      <Tag color="orange" className="mb-1">
                        {t(item.LeadStatusHistory.leadStatusFrom.title)}
                      </Tag>
                    )}
                    <IoInformationOutline className="mx-1 text-gray-400" size={16} />
                    {item.LeadStatusHistory?.leadStatusTo && (
                      <Tag color="green" className="mb-1">
                        {t(item.LeadStatusHistory.leadStatusTo.title)}
                      </Tag>
                    )}
                  </div>
                </div>
              ),
              dot: (
                <div className="grid size-8 place-items-center rounded-full bg-green-500 shadow-md">
                  <IoInformationOutline className="text-white" size={16} />
                </div>
              ),
            };
          }

          return null;
        })
        .filter(Boolean),
    );
  }, [leadHistoriesData, t, isDarkMode]);

  if (!comments?.length) return null;

  return (
    <div
      css={css`
        padding-top: 25px;
        padding-left: 25px;

        .ant-timeline {
          padding-left: 0;
        }

        .ant-timeline .ant-timeline-item:not(:last-child) {
          padding-bottom: 32px !important;
        }

        .ant-timeline .ant-timeline-item:last-child {
          padding-bottom: 0px !important;
        }

        .ant-timeline .ant-timeline-item-head {
          background-color: transparent !important;
          border: none !important;
        }

        .ant-timeline .ant-timeline-item-tail {
          border-left: 2px solid ${isDarkMode ? '#374151' : '#e5e7eb'} !important;
        }

        .ant-timeline .ant-timeline-item-content {
          margin-top: -4px !important;
        }
      `}
    >
      <Timeline items={comments} />
    </div>
  );
};

export default LeadHistory;
