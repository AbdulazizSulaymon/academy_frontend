import { Button, Progress, Tooltip, Upload } from 'antd';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile as UploadFileType } from 'antd/es/upload/interface';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

import { baseBackendUrl } from '@data/const';
import { join } from '@fireflysemantics/join';
import { Api, useApi } from '@src/api';
import { extractFileName, getImagePath } from '@utils/util';
import { UploadListType } from 'antd/es/upload/interface';
import { useTranslation } from 'react-i18next';
import {
  AiFillFileExcel,
  AiFillFileImage,
  AiFillFilePdf,
  AiFillFileText,
  AiFillFileUnknown,
  AiFillFileWord,
  AiFillFileZip,
  AiFillPlayCircle,
} from 'react-icons/ai';
import { useNotification } from '@hooks/use-notification';
import CropperModal from '@components/upload/cropper-modal';

export type FileResponse = {
  name: string;
  uploadPath: string;
} & Record<string, any>;

export const itemRender: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
  return <Tooltip title={file.name}>{originNode}</Tooltip>;
};

export const iconRender: UploadProps['iconRender'] = (file) => {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'webp':
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'bmp':
      return <AiFillFileImage style={{ fontSize: '24px', color: '#5ea0ff' }} />;
    case 'pdf':
      return <AiFillFilePdf style={{ fontSize: '24px', color: '#f5222d' }} />;
    case 'doc':
    case 'docx':
      return <AiFillFileWord style={{ fontSize: '24px', color: '#1890ff' }} />;
    case 'xls':
    case 'xlsx':
      return <AiFillFileExcel style={{ fontSize: '24px', color: '#52c41a' }} />;
    case 'zip':
    case 'rar':
      return <AiFillFileZip style={{ fontSize: '24px', color: '#faad14' }} />;
    case 'txt':
      return <AiFillFileText style={{ fontSize: '24px', color: '#1890ff' }} />;
    case 'mp4':
    case 'avi':
    case 'mov':
    case 'mkv':
      return <AiFillPlayCircle style={{ fontSize: '24px', color: '#1890ff' }} />;
    default:
      return <AiFillFileUnknown style={{ fontSize: '24px', color: '#faad14' }} />;
  }
};

export const UploadFile = ({
  onSuccess: onSuccessEvent,
  onError: onErrorEvent,
  defaultFile,
  uploadPath,
  className = '',
  accept = 'image/*',
  multiple,
  fileKeyName,
  listType,
  disabled,
  aspectRatio,
  showCrop = false,
}: {
  onSuccess?: Function;
  onError?: Function;
  defaultFile?: string;
  uploadPath?: string;
  className?: string;
  accept?: string;
  multiple?: boolean;
  fileKeyName?: string;
  listType?: UploadListType;
  disabled?: boolean;
  aspectRatio?: number;
  showCrop?: boolean;
}) => {
  const { t } = useTranslation();
  const api: Api = useApi();
  const { notifyError } = useNotification();
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState<UploadFileType[]>([]);
  const MAX_FILE_SIZE_MB = useMemo(() => 50, []);
  const MAX_FILE_IMAGE_SIZE_MB = useMemo(() => 10, []);
  const MAX_FILE_VIDEO_SIZE_MB = useMemo(() => 40, []);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [croppingFile, setCroppingFile] = useState<File | null>(null);
  const [resolveCrop, setResolveCrop] = useState<(file: File) => void>();

  const handleCropDone = (croppedFile: File) => {
    if (resolveCrop) resolveCrop(croppedFile);
    setCropModalOpen(false);
    setCroppingFile(null);
  };

  const beforeUpload = useCallback(async (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const limit = isImage ? MAX_FILE_IMAGE_SIZE_MB : isVideo ? MAX_FILE_VIDEO_SIZE_MB : MAX_FILE_SIZE_MB;
    const isUnderSizeLimit = file.size / 1024 / 1024 < limit;

    if (!isUnderSizeLimit) {
      notifyError(`${file.name} exceeds the size limit of ${limit}MB!`);
      return Upload.LIST_IGNORE;
    }

    if (isImage && showCrop) {
      const croppedFile = await showCropperModal(file);
      return croppedFile;
    }

    return true;
  }, []);

  const showCropperModal = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      setCroppingFile(file);
      setCropModalOpen(true);
      setResolveCrop(() => resolve);
    });
  };

  useEffect(() => {
    const files = (typeof defaultFile == 'string' ? [defaultFile] : defaultFile || []).filter((item) => !!item);
    setFileList(
      files.map((file: string) => ({
        uid: file || '1',
        name: extractFileName(file) || 'File',
        status: 'done',
        url: getImagePath(file),
      })),
    );
    if (onSuccessEvent) {
      onSuccessEvent(
        defaultFile
          ? multiple
            ? files.map((file: string) => ({
                name: '',
                uploadPath: file.slice(0, 4) == 'http' ? file : 'public/' + file,
              }))
            : {
                name: '',
                uploadPath: defaultFile.slice(0, 4) == 'http' ? defaultFile : 'public/' + defaultFile,
              }
          : null,
      );
    }
  }, [defaultFile]);

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    fmData.append(fileKeyName || 'file', file);
    try {
      const res = await api.instance({
        method: 'post',
        url: uploadPath || join(baseBackendUrl, 'api/upload'),
        data: fmData,
        headers: { 'Content-Type': 'multipart/form-data', 'Cache-Control': 'no-cache' },
        onUploadProgress: (event: any) => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
          onProgress({ percent });
        },
      });

      onSuccess(res?.data);
      setProgress(100);
    } catch (err) {
      onError({ err });
      if (onErrorEvent) onErrorEvent(err ? { err } : { err: 'Error' });
    }
  };

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
    }
  }, [progress]);

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (onSuccessEvent) {
      const updatedFiles = newFileList
        .filter((file) => (file.status === 'done' && file.response) || !file.uid.startsWith('rc-upload'))
        .map((file) => ({
          name: file.name || '',
          uploadPath: file.response?.uploadPath || file.uid || '',
        }));

      onSuccessEvent(multiple ? updatedFiles : updatedFiles[0] || null);
    }
  };

  return (
    <div className={className}>
      <Upload
        accept={accept}
        customRequest={uploadImage}
        listType={listType || 'picture-card'}
        onChange={handleChange}
        fileList={fileList}
        multiple={multiple}
        disabled={disabled}
        itemRender={itemRender}
        iconRender={iconRender}
        beforeUpload={beforeUpload}
      >
        {(fileList.length == 0 || multiple) &&
          (listType == 'text' ? (
            <Button className={'mb-2 flex cursor-pointer items-center'}>
              <FiUpload className={'mr-1'} /> {t('Upload')}
            </Button>
          ) : (
            <div className={'mb-2 flex cursor-pointer items-center'}>
              <FiUpload className={'mr-1'} /> {t('Upload')}
            </div>
          ))}
      </Upload>
      {progress > 0 ? <Progress percent={progress} /> : null}
      {cropModalOpen && croppingFile && (
        <CropperModal
          aspectRatio={aspectRatio}
          file={croppingFile}
          onDone={handleCropDone}
          onCancel={() => {
            setCropModalOpen(false);
            setCroppingFile(null);
          }}
        />
      )}
    </div>
  );
};
