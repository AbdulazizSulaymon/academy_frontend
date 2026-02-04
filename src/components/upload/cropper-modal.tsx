import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Select } from 'antd';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@utils/crop-image';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

interface CropperModalProps {
  file: File;
  aspectRatio?: number; // Optional aspect ratio from props
  onDone: (croppedFile: File) => void;
  onCancel: () => void;
}

const CropperModal: React.FC<CropperModalProps> = ({ file, aspectRatio, onDone, onCancel }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [currentAspectRatio, setCurrentAspectRatio] = useState<number>(aspectRatio || 1); // Default to 1:1 if no aspect ratio
  const { t } = useTranslation();
  const imageRef = useRef<HTMLImageElement>(null);

  // FileReader to load the image
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  // Update crop position
  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  // Update zoom level
  const onZoomChange = (zoom: number) => {
    setZoom(zoom);
  };

  // After crop completion, set cropped area pixels
  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Handle cropping and return the file
  const handleCrop = async () => {
    if (imageUrl && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
      const croppedFile = new File([croppedImage], file.name, { type: file.type });
      onDone(croppedFile);
      onCancel(); // Close modal after cropping
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <Modal
      open={true}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          {t('Bekor qilish')}
        </Button>,
        <Button key="crop" type="primary" onClick={handleCrop}>
          {t('Kesish')}
        </Button>,
      ]}
      width={600}
    >
      <div style={{ textAlign: 'center' }}>
        {imageUrl && (
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
            {/* Only show select for aspectRatio if it's not passed via props */}
            {!aspectRatio && (
              <Select
                value={currentAspectRatio}
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  zIndex: 1000,
                  width: 100,
                }}
                onChange={(value) => setCurrentAspectRatio(value)}
              >
                <Option value={1}>1:1</Option>
                <Option value={16 / 9}>16:9</Option>
                <Option value={4 / 3}>4:3</Option>
                <Option value={3 / 2}>3:2</Option>
                <Option value={21 / 9}>21:9</Option>
              </Select>
            )}
            {/* Cropper with dynamic aspect ratio */}
            <Cropper
              image={imageUrl}
              crop={crop}
              zoom={zoom}
              aspect={currentAspectRatio} // Use current aspect ratio
              onCropChange={onCropChange}
              onZoomChange={onZoomChange}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={false}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CropperModal;
