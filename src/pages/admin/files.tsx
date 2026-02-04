import { join } from '@fireflysemantics/join';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Image, Modal } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@src/api';
import { NextPageWithLayout } from '@/types';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';
import VirtualTable from '@components/table/virtual-table';

import { baseBackendUrl } from '@data/const';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useNotification } from '@hooks/use-notification';

import { isImage, isVideo, getMediaType } from '@utils/util';
import { useLocationParams } from '@hooks/use-location-params';

const Page: NextPageWithLayout = observer(function Home() {
  const { push } = useLocationParams();
  const api = useApi();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [isFileInfoModalOpen, setIsFileInfoModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<Record<string, any> | null>(null);

  const viewFullVideo = (url: string) => {
    setSelectedVideoUrl(url);
    setIsVideoModalOpen(true);
  };

  // Fayl hajmini formatlash funksiyasi
  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return '-';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const columns = useMemo(
    () => [
      {
        Header: t('Directory') || '',
        accessor: (value: Record<string, any>) => {
          return value.name ? value.name.slice(8, value.name.lastIndexOf('/')) : '';
        },
        width: 120,
      },
      {
        Header: t('Media') || '',
        accessor: (value: Record<string, any>) => {
          if (!value.name) return '';

          const fileUrl = join(baseBackendUrl, value.name);

          return isImage(value.name) ? (
            <Image
              src={fileUrl}
              alt=""
              width={50}
              height={50}
              className="rounded"
              preview={{ mask: t('Ko‘rish') || '' }}
            />
          ) : (
            <div onClick={() => viewFullVideo(fileUrl)} style={{ cursor: 'pointer' }}>
              <video src={fileUrl} width={50} height={50} className="rounded" muted />
            </div>
          );
        },
        width: 100,
      },
      {
        Header: t('Name') || '',
        accessor: (value: Record<string, any>) => {
          return value.name ? value.name.slice(value.name.lastIndexOf('/') + 1) : '';
        },
        width: 400,
      },
    ],
    [t],
  );

  const { data, isLoading, isError } = useQuery(
    ['files'], 
    () => api.instance.get('api/upload', { params: { includeSize: false } })
  );

  const open = useCallback((data: Record<string, any>) => {}, []);
  const download = useCallback((data: Record<string, any>) => {}, []);

  const viewFileInfo = useCallback((record: Record<string, any>) => {
    // Fayl hajmini olish uchun HEAD request yuborish
    const fileUrl = join(baseBackendUrl, record.name);
    setSelectedFile({ ...record, url: fileUrl });
    setIsFileInfoModalOpen(true);
  }, []);

  // Fayl ma'lumotlarini olish uchun HEAD request
  const [fileInfo, setFileInfo] = useState<{ size?: number; type?: string; lastModified?: string } | null>(null);
  
  useEffect(() => {
    if (selectedFile && isFileInfoModalOpen) {
      // Backend API orqali fayl metadata olish
      api.instance
        .get('api/upload/metadata', {
          params: { path: selectedFile.name },
        })
        .then((response) => {
          setFileInfo({
            size: response.data.size,
            type: response.data.type,
            lastModified: response.data.lastModified,
          });
        })
        .catch(() => {
          setFileInfo(null);
        });
    } else {
      setFileInfo(null);
    }
  }, [selectedFile, isFileInfoModalOpen, api.instance]);

  const { mutate: remove, isLoading: isLoadingRemove } = useMutation(
    (data: Record<string, any>) => api.instance.delete('api/upload', data),
    {
      onSuccess: () => {
        notifySuccess('Deleted successfully!');
        queryClient.invalidateQueries({ queryKey: ['files'] });
      },
      onError: () => notifyError('An error occurred!'),
    },
  );
  return (
    <Box>
      <VirtualTable
        name={'Files'}
        data={data?.data?.files.map((item: string | Record<string, any>) => {
          // Agar item string bo'lsa (eski format), object'ga o'tkazish
          // Agar item object bo'lsa (yangi format), to'g'ridan-to'g'ri ishlatish
          if (typeof item === 'string') {
            return { name: item, size: 0 };
          }
          return item;
        })}
        columns={columns}
        loading={isLoading}
        error={isError}
        total={data?.data?.files?.length}
        add={false}
        editButton={false}
        removeButton={false}
        viewCallback={viewFileInfo}
        itemHeight={65}
      />
      <Modal open={isVideoModalOpen} onCancel={() => setIsVideoModalOpen(false)} footer={null} centered width={800}>
        <video src={selectedVideoUrl} controls autoPlay style={{ width: '100%' }} />
      </Modal>

      <Modal
        open={isFileInfoModalOpen}
        onCancel={() => {
          setIsFileInfoModalOpen(false);
          setSelectedFile(null);
          setFileInfo(null);
        }}
        footer={null}
        centered
        width={selectedFile && getMediaType(selectedFile.name) !== 'unknown' ? 800 : 600}
        title={t('Fayl ma\'lumotlari') || 'Fayl ma\'lumotlari'}
      >
        {selectedFile && (
          <div className="space-y-4">
            {/* Media ko'rsatish - agar rasm yoki video bo'lsa */}
            {getMediaType(selectedFile.name) === 'image' && (
              <div className="mb-4 flex justify-center">
                <Image
                  src={selectedFile.url}
                  alt={selectedFile.name?.slice(selectedFile.name.lastIndexOf('/') + 1)}
                  style={{ maxWidth: '100%', maxHeight: '500px' }}
                  className="rounded-lg"
                  preview={{ mask: t('Kattalashtirish') || 'Kattalashtirish' }}
                />
              </div>
            )}
            
            {getMediaType(selectedFile.name) === 'video' && (
              <div className="mb-4 flex justify-center bg-black rounded-lg overflow-hidden">
                <video
                  src={selectedFile.url}
                  controls
                  style={{ maxWidth: '100%', maxHeight: '500px' }}
                  className="rounded-lg"
                >
                  {t('Brauzeringiz video formatini qo\'llab-quvvatlamaydi') || 'Brauzeringiz video formatini qo\'llab-quvvatlamaydi'}
                </video>
              </div>
            )}

            {getMediaType(selectedFile.name) === 'unknown' && (
              <div className="mb-4 flex justify-center items-center bg-gray-100 rounded-lg p-8">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto text-gray-400 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    {t('Fayl turi') || 'Fayl turi'}: {selectedFile.name?.split('.').pop()?.toUpperCase() || 'Noma\'lum'}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">{t('Fayl nomi') || 'Fayl nomi'}:</h4>
                <p className="text-gray-700 break-all text-sm">{selectedFile.name?.slice(selectedFile.name.lastIndexOf('/') + 1)}</p>
              </div>
              
              {fileInfo?.size !== undefined && (
                <div>
                  <h4 className="font-semibold mb-2">{t('Hajm') || 'Hajm'}:</h4>
                  <p className="text-gray-700 text-sm">{formatFileSize(fileInfo.size)}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-2">{t('To\'liq yo\'l') || 'To\'liq yo\'l'}:</h4>
              <p className="text-gray-700 break-all text-sm bg-gray-50 p-2 rounded">{selectedFile.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fileInfo?.type && (
                <div>
                  <h4 className="font-semibold mb-2">{t('MIME turi') || 'MIME turi'}:</h4>
                  <p className="text-gray-700 text-sm">{fileInfo.type}</p>
                </div>
              )}
              
              {fileInfo?.lastModified && (
                <div>
                  <h4 className="font-semibold mb-2">{t('Oxirgi o\'zgarish') || 'Oxirgi o\'zgarish'}:</h4>
                  <p className="text-gray-700 text-sm">{new Date(fileInfo.lastModified).toLocaleString()}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-2">{t('URL') || 'URL'}:</h4>
              <p className="text-gray-700 break-all text-sm bg-gray-50 p-2 rounded">{selectedFile.url}</p>
            </div>

            <div className="mt-4 pt-4 border-t flex gap-3">
              <a
                href={selectedFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                {t('Yangi oynada ochish') || 'Yangi oynada ochish'}
              </a>
              <span className="text-gray-300">|</span>
              <a
                href={selectedFile.url}
                download
                className="text-blue-600 hover:text-blue-800 underline text-sm"
              >
                {t('Yuklab olish') || 'Yuklab olish'}
              </a>
            </div>
          </div>
        )}
      </Modal>
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
