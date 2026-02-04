import { NextPageWithLayout } from '@/types';
import { Box } from '@components/box';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { useNotification } from '@hooks/use-notification';
import { useApi } from '@src/api';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { Button, Card, Divider, Typography, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { Download, UploadCloud } from 'lucide-react';
import React, { ReactElement, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Page: NextPageWithLayout = () => {
  const { t } = useTranslation();
  const api = useApi();
  const { notifyError, notifySuccess } = useNotification();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  const downloadZip = async () => {
    try {
      setDownloadLoading(true);
      const res = await api.instance.get('api/upload/zip', { responseType: 'blob', timeout: 0 });
      const blob = new Blob([res.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `uploads.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      notifySuccess(t('Yuklab olindi') || 'Yuklab olindi');
    } catch (e) {
      notifyError(t('Xatolik') || 'Xatolik');
    } finally {
      setDownloadLoading(false);
    }
  };

  const uploadProps: UploadProps = useMemo(
    () => ({
      accept: '.zip,application/zip',
      maxCount: 1,
      showUploadList: true,
      customRequest: async (options) => {
        const { file, onProgress, onSuccess, onError } = options as any;
        try {
          setImportLoading(true);
          setImportResult(null);
          const fm = new FormData();
          fm.append('file', file);
          const res = await api.instance.post('api/upload/zip', fm, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (evt) => {
              if (!evt.total) return;
              const percent = Math.round((evt.loaded / evt.total) * 100);
              onProgress?.({ percent });
            },
          });
          setImportResult(res.data);
          notifySuccess(t('Yuklandi') || 'Yuklandi');
          onSuccess?.(res.data);
        } catch (err) {
          notifyError(t('Xatolik') || 'Xatolik');
          onError?.(err);
        } finally {
          setImportLoading(false);
        }
      },
    }),
    [api.instance, notifyError, notifySuccess, t],
  );

  return (
    <Box className="space-y-4">
      <div>
        <Title level={3} className="!mb-0">
          {t('Uploads transfer') || 'Uploads transfer'}
        </Title>
        <Text type="secondary">
          {t("Bu sahifa server ko'chirishda yordam beradi: uploads papkasini zip qilib yuklab olish va boshqa serverga zip orqali yuklash.") ||
            "Bu sahifa server ko'chirishda yordam beradi: uploads papkasini zip qilib yuklab olish va boshqa serverga zip orqali yuklash."}
        </Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card
          title={t('Download') || 'Download'}
          extra={
            <Button
              type="primary"
              icon={<Download className="w-4 h-4" />}
              onClick={downloadZip}
              loading={downloadLoading}
              disabled={importLoading}
            >
              {t('uploads.zip yuklab olish') || 'uploads.zip yuklab olish'}
            </Button>
          }
          className="rounded-2xl"
        >
          <Text type="secondary">
            {t('Serverdagi public/uploads papkasi zip holatida yuklab olinadi.') ||
              'Serverdagi public/uploads papkasi zip holatida yuklab olinadi.'}
          </Text>
        </Card>

        <Card title={t('Upload') || 'Upload'} className="rounded-2xl">
          <Text type="secondary">
            {t("uploads.zip ni yuklang. Ichidagi papkalar saqlangan holda serverdagi public/uploads ichiga joylanadi (yo'q bo'lsa papka yaratiladi).") ||
              "uploads.zip ni yuklang. Ichidagi papkalar saqlangan holda serverdagi public/uploads ichiga joylanadi (yo'q bo'lsa papka yaratiladi)."}
          </Text>
          <Divider />
          <Upload.Dragger {...uploadProps} disabled={importLoading}>
            <p className="ant-upload-drag-icon">
              <UploadCloud className="w-10 h-10 mx-auto" />
            </p>
            <p className="ant-upload-text">{t('Zip faylni shu yerga tashlang') || 'Zip faylni shu yerga tashlang'}</p>
            <p className="ant-upload-hint">{t('Faqat .zip') || 'Faqat .zip'}</p>
          </Upload.Dragger>

          {importResult ? (
            <div className="mt-3 text-sm">
              <div>
                <b>{t('Yozilgan fayllar') || 'Yozilgan fayllar'}:</b> {importResult.filesWritten ?? '-'}
              </div>
              <div className="mt-1">
                <b>{t('Yaratilgan papkalar') || 'Yaratilgan papkalar'}:</b>{' '}
                {Array.isArray(importResult.createdFolders) ? importResult.createdFolders.length : '-'}
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </Box>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Uploads transfer">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;

