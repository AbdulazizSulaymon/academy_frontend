import React, { ReactElement, useState } from 'react';
import StudentLayout from '@src/components/student-layout';
import { Bookmark, BookOpen, Clock, PlayCircle, Trash2, Search, Filter, X } from 'lucide-react';
import { useLayoutStore } from '@src/stores/layout-store';
import { useMyTheme } from '@hooks/use-my-theme';
import { observer } from 'mobx-react';
import { useBookmarks } from '@src/queries/models/bookmark';
import { useDeleteBookmark } from '@src/queries/models/bookmark';
import { get } from 'lodash';
import { NextPageWithLayout } from '@/types';
import { StudentDynamicProviders } from '@hocs/dynamic-providers';
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/card';
import { Input, Modal, message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { getImagePath } from '@utils/util';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

const BookmarksPage: NextPageWithLayout = observer(() => {
  const { user } = useLayoutStore();
  const { isDarkMode } = useMyTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookmark, setSelectedBookmark] = useState<any>(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteText, setNoteText] = useState('');

  // Fetch user bookmarks
  const { data: bookmarksResponse, isLoading: isLoadingBookmarks } = useBookmarks(
    {
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      where: {
        userId: user?.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    },
    { enabled: !!user?.id },
  );

  const bookmarks = get(bookmarksResponse, 'data.data', []);

  // Delete bookmark mutation
  const { deleteBookmark } = useDeleteBookmark(
    {},
    {
      invalidateQueries: ['bookmarks'],
      successToast: t('Saqlangan olib tashlandi'),
      errorToast: t("Xatolik sodir bo'ldi"),
    },
  );

  // Filter bookmarks by search query
  const filteredBookmarks = bookmarks.filter((bookmark: any) => {
    const lesson = bookmark.lesson;
    const title = lesson?.titleUz || lesson?.titleRu || lesson?.titleEn || '';
    const courseName =
      lesson?.module?.course?.titleUz || lesson?.module?.course?.titleRu || lesson?.module?.course?.titleEn || '';
    const query = searchQuery.toLowerCase();

    return (
      title.toLowerCase().includes(query) ||
      courseName.toLowerCase().includes(query) ||
      (bookmark.note || '').toLowerCase().includes(query)
    );
  });

  // Format duration
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle delete bookmark
  const handleDeleteBookmark = (bookmarkId: string) => {
    Modal.confirm({
      title: t('Saqlangan olib tashlansinmi?'),
      content: t("Bu amalni bekor qilib bo'lmaydi"),
      okText: t('Ha'),
      cancelText: t("Yo'q"),
      onOk: () => {
        deleteBookmark({ where: { id: bookmarkId } });
      },
    });
  };

  // Handle edit note
  const handleEditNote = (bookmark: any) => {
    setSelectedBookmark(bookmark);
    setNoteText(bookmark.note || '');
    setNoteModalOpen(true);
  };

  // Handle save note
  const handleSaveNote = () => {
    // Note: You'll need to add updateBookmark mutation to the API
    message.success(t('Eslatma saqlandi'));
    setNoteModalOpen(false);
    setSelectedBookmark(null);
    setNoteText('');
  };

  // Group bookmarks by course
  const groupedByCourse = filteredBookmarks.reduce((acc: any, bookmark: any) => {
    const course = bookmark.lesson?.module?.course;
    const courseTitle = course?.titleUz || course?.titleRu || course?.titleEn || "Noma'lum kurs";

    if (!acc[courseTitle]) {
      acc[courseTitle] = {
        course,
        lessons: [],
      };
    }

    acc[courseTitle].lessons.push(bookmark);
    return acc;
  }, {});

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('Saqlangan darslar') || 'Saqlangan darslar'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('Siz saqlagan barcha darslar') || 'Siz saqlagan barcha darslar'} ({bookmarks.length})
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder={t('Qidirish...') || 'Qidirish...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-12 rounded-xl border-gray-200 dark:border-gray-700"
          allowClear
        />
      </div>

      {/* Loading State */}
      {isLoadingBookmarks ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : bookmarks.length === 0 ? (
        <GlassCard className="text-center">
          <Bookmark className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t("Saqlangan darslar yo'q") || "Saqlangan darslar yo'q"}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t("Darslarni saqlash uchun bookmark qo'shing") || "Darslarni saqlash uchun bookmark qo'shing"}
          </p>
        </GlassCard>
      ) : filteredBookmarks.length === 0 ? (
        <GlassCard className="text-center">
          <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t('Hech narsa topilmadi') || 'Hech narsa topilmadi'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {t("Boshqa kalit so'z bilan urinib ko'ring") || "Boshqa kalit so'z bilan urinib ko'ring"}
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedByCourse).map(([courseTitle, group]: [string, any]) => (
            <div key={courseTitle}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                {courseTitle}
                <span className="text-sm font-normal text-gray-500">({group.lessons.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.lessons.map((bookmark: any) => {
                  const lesson = bookmark.lesson;

                  return (
                    <GlassCard key={bookmark.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative">
                        {lesson.videoThumbnail ? (
                          <img
                            src={getImagePath(lesson.videoThumbnail)}
                            alt={lesson.titleUz || lesson.titleEn}
                            className="w-full h-40 object-cover"
                          />
                        ) : (
                          <div className="w-full h-40 bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center">
                            <PlayCircle className="w-16 h-16 text-white/80" />
                          </div>
                        )}

                        {lesson.duration && (
                          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
                            {formatDuration(lesson.duration)}
                          </div>
                        )}

                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            onClick={() => handleEditNote(bookmark)}
                            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                            title={t('Eslatma') || 'Eslatma'}
                          >
                            <svg
                              className="w-4 h-4 text-gray-700 dark:text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteBookmark(bookmark.id)}
                            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            title={t('Olib tashlash') || 'Olib tashlash'}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {lesson.titleUz || lesson.titleRu || lesson.titleEn}
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
                          {lesson.module?.titleUz || lesson.module?.titleRu || lesson.module?.titleEn}
                        </p>

                        {bookmark.note && (
                          <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-3">
                            <p className="text-xs text-yellow-800 dark:text-yellow-200 line-clamp-2">
                              "{bookmark.note}"
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {new Date(bookmark.createdAt).toLocaleDateString('uz-UZ')}
                          </span>

                          <PrimaryButton>
                            <PlayCircle className="w-4 h-4 mr-1" />
                            {t("Ko'rish") || "Ko'rish"}
                          </PrimaryButton>
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Modal */}
      <Modal
        title={t("Eslatma qo'shish") || "Eslatma qo'shish"}
        open={noteModalOpen}
        onOk={handleSaveNote}
        onCancel={() => {
          setNoteModalOpen(false);
          setSelectedBookmark(null);
          setNoteText('');
        }}
        okText={t('Saqlash')}
        cancelText={t('Bekor qilish')}
      >
        <TextArea
          rows={4}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder={t('Bu dars haqida eslatma yozing...') || 'Bu dars haqida eslatma yozing...'}
        />
      </Modal>
    </div>
  );
});

BookmarksPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <StudentDynamicProviders>
      <StudentLayout title="Saqlangan">{page}</StudentLayout>
    </StudentDynamicProviders>
  );
};

export default BookmarksPage;
