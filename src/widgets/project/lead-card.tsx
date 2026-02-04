import { Card, Tooltip, Badge, Avatar } from 'antd';
import { css } from '@emotion/react';
import { Lead } from '@src/types/lead';
import { useLocationParams } from '@hooks/use-location-params';
import { useTranslation } from 'react-i18next';
import { useFormatDate } from '@hooks/use-format-date';
import { getUserFullName, getImagePath } from '@utils/util';
import { MdPhone, MdAccessTime, MdCalendarToday } from 'react-icons/md';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const LeadCard = ({ lead, isDragging }: { lead: Lead; isDragging?: boolean }) => {
  const { push } = useLocationParams();
  const { t } = useTranslation();
  const { formatDate } = useFormatDate();

  const handleClick = () => {
    push({ query: { viewLead: true, id: lead.id } });
  };

  // Calculate days since creation
  const daysAgo = dayjs().diff(dayjs(lead.createdAt), 'day');
  const getAgeColor = () => {
    if (daysAgo <= 1) return '#52c41a'; // green
    if (daysAgo <= 3) return '#faad14'; // yellow
    if (daysAgo <= 7) return '#ff7a45'; // orange
    return '#ff4d4f'; // red
  };

  return (
    <Card
      hoverable
      className={`transition-all ${isDragging ? 'scale-105 opacity-90' : ''}`}
      onClick={handleClick}
      css={css`
        cursor: ${isDragging ? 'grabbing' : 'grab'};
        transition: all 0.3s;

        &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-2px);
        }

        .ant-card-body {
          padding: 12px;
        }
      `}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h4 className="mb-1 line-clamp-1 text-sm font-medium">{lead.title || t('Untitled Lead')}</h4>
          <div className="flex items-center gap-2">
            <Tooltip title={formatDate(lead.createdAt)}>
              <span className="text-xs" style={{ color: getAgeColor() }}>
                <MdAccessTime className="mr-1 inline" size={12} />
                {daysAgo === 0 ? t('Today') : `${daysAgo} ${t('days ago')}`}
              </span>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-2 space-y-1">
        {lead.data?.phone && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <MdPhone size={14} />
            <span>{lead.data.phone}</span>
          </div>
        )}
        {lead.data?.email && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-gray-500">@</span>
            <span className="truncate">{lead.data.email}</span>
          </div>
        )}
      </div>

      {/* Next call date */}
      {lead.nextCallDate && (
        <div className="mb-2 text-xs text-gray-600">
          <MdCalendarToday className="mr-1 inline" size={14} />
          <span>{dayjs(lead.nextCallDate).format('DD.MM.YYYY')}</span>
        </div>
      )}

      {/* Comment preview */}
      {lead.comment && (
        <Tooltip title={lead.comment}>
          <p className="mb-2 line-clamp-2 text-xs text-gray-500">{lead.comment}</p>
        </Tooltip>
      )}

      {/* Footer - Assignees */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
        <div className="flex items-center gap-2">
          {/* Specialists */}
          {lead.specialists && lead.specialists.length > 0 && (
            <Avatar.Group
              maxCount={2}
              size={24}
              maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
                fontSize: '12px',
              }}
            >
              {lead.specialists.map((specialist: Record<string, any>) => (
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
        </div>
      </div>
    </Card>
  );
};
