import { getImagePath } from '@utils/util';
import type { UploadFile } from 'antd';
import { Button, Upload } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GoDownload } from 'react-icons/go';

interface ShowFileProps {
  fileUrl: string;
  textColor?: string;
}

const ShowFile: FC<ShowFileProps> = observer(({ fileUrl, textColor = '#1677ff' }) => {
  const { t } = useTranslation();
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList([
      {
        uid: Math.random().toString(),
        name: 'image.png',
        status: 'done',
        url: getImagePath(fileUrl),
      },
    ]);
  }, [fileUrl]);

  const isImage = (fileName: string) => {
    return /\.(jpg|jpeg|png|webp)$/i.test(fileName);
  };

  const getFileName = (filePath: string) => {
    const fileName = decodeURIComponent(filePath.split('/').pop() || '');
    const actualFileName = fileName.split('-').slice(1).join('-');
    return actualFileName;
  };

  return (
    <div className={'flex flex-col gap-2'}>
      {isImage(fileUrl) ? (
        <Upload listType={'picture-card'} fileList={fileList} disabled={true} />
      ) : (
        <Button
          type={'link'}
          className={`w-fit ${
            textColor !== '#1677ff' && textColor[0] !== '#' ? `text-${textColor}` : `text-[${textColor}]`
          }`}
          icon={<GoDownload />}
          href={getImagePath(fileUrl)}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          {getFileName(fileUrl)}
        </Button>
      )}
    </div>
  );
});

export default ShowFile;
