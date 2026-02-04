import { isImage, isVideo } from '@src/utils/util';
import { Image, Modal } from 'antd';
import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { css } from '@emotion/react';
import { IoImageOutline } from 'react-icons/io5';

type Props = {
  src: string;
  width?: number;
  height?: number;
};

export const MediaPreview = ({ src, width = 60, height }: Props) => {
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  if (isImage(src)) {
    return (
      <Image
        width={width}
        height={height}
        src={src}
        preview={{
          mask: <MdOutlineRemoveRedEye />,
        }}
        style={{ cursor: 'pointer', borderRadius: 4 }}
      />
    );
  }

  if (isVideo(src)) {
    const videoWidth = width;
    const videoHeight = height ?? 40;

    return (
      <>
        <div
          onClick={() => setVideoModalVisible(true)}
          className={'bg-gray-300 dark:bg-gray-700'}
          style={{
            width: videoWidth,
            height: videoHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 4,
            cursor: 'pointer',
            // color: '#fff',
            fontSize: 12,
          }}
        >
          ▶
        </div>

        {videoModalVisible && (
          <Modal
            open={videoModalVisible}
            onCancel={() => setVideoModalVisible(false)}
            footer={null}
            width={720}
            centered
            css={css`
              .ant-modal-content {
                padding: 0;
              }
            `}
          >
            <video src={src} controls autoPlay style={{ width: '100%', borderRadius: 8, display: 'block' }} />
          </Modal>
        )}
      </>
    );
  }

  return (
    <div className={'flex items-center h-full'}>
      <IoImageOutline className={'text-2xl'} />
    </div>
  );
};
