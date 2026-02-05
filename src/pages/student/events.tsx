import React, { ReactElement } from 'react';
import StudentLayout from '@src/components/student-layout';
import { Calendar, MapPin, Users, Video, Clock, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useEvents } from '@src/queries/models/event';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';

import { AcademyEventStatus, getStatusColor } from '@api/academy-types';
import { Badge, Tag } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/uz';

dayjs.extend(relativeTime);
dayjs.locale('uz');

const EventsPage: NextPageWithLayout = observer(() => {
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();

  // Fetch events
  const { data: eventsResponse, isLoading: isLoadingEvents } = useEvents(
    {
      orderBy: {
        startDate: 'asc',
      },
    },
    { enabled: true },
  );

  const events = get(eventsResponse, 'data.data', []);

  // Get status badge
  const getStatusBadge = (status: AcademyEventStatus) => {
    const colors: Record<AcademyEventStatus, string> = {
      [AcademyEventStatus.Expected]: 'blue',
      [AcademyEventStatus.OnGoing]: 'green',
      [AcademyEventStatus.Completed]: 'default',
      [AcademyEventStatus.Canceled]: 'red',
    };

    const labels: Record<AcademyEventStatus, string> = {
      [AcademyEventStatus.Expected]: t('Kutilmoqda') || 'Kutilmoqda',
      [AcademyEventStatus.OnGoing]: t('Davom etmoqda') || 'Davom etmoqda',
      [AcademyEventStatus.Completed]: t('Tugagan') || 'Tugagan',
      [AcademyEventStatus.Canceled]: t('Bekor qilingan') || 'Bekor qilingan',
    };

    return (
      <Tag color={colors[status]} className="m-0">
        {labels[status]}
      </Tag>
    );
  };

  // Format date
  const formatEventDate = (startDate: string, endDate?: string) => {
    const start = dayjs(startDate);
    const end = endDate ? dayjs(endDate) : null;

    if (end) {
      return `${start.format('DD MMMM YYYY')} - ${end.format('DD MMMM YYYY')}`;
    }
    return start.format('DD MMMM YYYY');
  };

  // Format time
  const formatEventTime = (startDate: string) => {
    return dayjs(startDate).format('HH:mm');
  };

  // Check if event is upcoming
  const isUpcoming = (startDate: string) => {
    return dayjs(startDate).isAfter(dayjs());
  };

  // Filter events by status
  const upcomingEvents = events.filter((e: any) => isUpcoming(e.startDate));
  const pastEvents = events.filter((e: any) => !isUpcoming(e.startDate));

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('Tadbirlar') || 'Tadbirlar'}</h1>
          <p className="!text-gray-600 dark:!text-gray-400">
            {t('Barcha tadbirlar va voqealar') || 'Barcha tadbirlar va voqealar'}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Jami tadbirlar') || 'Jami'}</p>
              <p className="!text-2xl !font-bold !text-gray-900 dark:!text-white mb-0">{events.length}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
              <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="!text-sm !text-gray-600 dark:!text-gray-400">{t('Kelgusi') || 'Kelgusi'}</p>
              <p className="!text-2xl !font-bold !text-gray-900 dark:!text-white mb-0">{upcomingEvents.length}</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="!text-sm !text-gray-600 dark:!text-gray-400">{t("O'tgan") || "O'tgan"}</p>
              <p className="!text-2xl !font-bold !text-gray-900 dark:!text-white mb-0">{pastEvents.length}</p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Loading State */}
      {isLoadingEvents ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('Kelgusi tadbirlar') || 'Kelgusi tadbirlar'}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingEvents.map((event: any) => (
                  <GlassCard key={event.id} className="overflow-hidden">
                    {event.coverImage && (
                      <div className="relative h-48 bg-gradient-to-br from-primary to-primary-600">
                        <img
                          src={event.coverImage}
                          alt={event.titleUz || event.titleEn}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">{getStatusBadge(event.status)}</div>
                      </div>
                    )}

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {event.titleUz || event.titleRu || event.titleEn}
                      </h3>

                      <p className="!text-gray-600 dark:!text-gray-400 !mb-4 line-clamp-2">
                        {event.descriptionUz || event.descriptionRu || event.descriptionEn}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 text-primary" />
                          {formatEventDate(event.startDate, event.endDate)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4 text-primary" />
                          {formatEventTime(event.startDate)}
                        </div>
                        {event.location && !event.isOnline && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 text-primary" />
                            {event.location}
                          </div>
                        )}
                        {event.isOnline && event.meetingLink && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Video className="w-4 h-4 text-primary" />
                            <a
                              href={event.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              {t('Online meeting') || 'Online meeting'}
                            </a>
                          </div>
                        )}
                        {event.maxParticipants && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <Users className="w-4 h-4 text-primary" />
                            {t('Maksimal ishtirokchilar')}: {event.maxParticipants}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {dayjs(event.startDate).fromNow()}
                        </span>
                        <PrimaryButton>
                          {t('Batafsil') || 'Batafsil'}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </PrimaryButton>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t("O'tgan tadbirlar") || "O'tgan tadbirlar"}
              </h2>
              <div className="space-y-4">
                {pastEvents.map((event: any) => (
                  <GlassCard key={event.id}>
                    <div className="flex items-start gap-4">
                      {event.coverImage && (
                        <div className="flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
                          <img
                            src={event.coverImage}
                            alt={event.titleUz || event.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {event.titleUz || event.titleRu || event.titleEn}
                          </h3>
                          {getStatusBadge(event.status)}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatEventDate(event.startDate, event.endDate)}
                          </div>
                          {event.isOnline && (
                            <div className="flex items-center gap-2">
                              <Video className="w-4 h-4" />
                              {t('Online')}
                            </div>
                          )}
                        </div>

                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {dayjs(event.startDate).fromNow()}
                        </span>
                      </div>

                      <SecondaryButton>{t('Batafsil') || 'Batafsil'}</SecondaryButton>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {events.length === 0 && (
            <GlassCard className="text-center">
              <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t("Tadbirlar yo'q") || "Tadbirlar yo'q"}
              </h3>
              <p className="!text-gray-600 dark:!text-gray-400">
                {t('Hozircha tadbirlar mavjud emas') || 'Hozircha tadbirlar mavjud emas'}
              </p>
            </GlassCard>
          )}
        </>
      )}
    </div>
  );
});

EventsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Tadbirlar">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default EventsPage;
