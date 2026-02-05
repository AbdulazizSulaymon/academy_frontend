import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';
import React from 'react';
import clsx from 'clsx';

interface StyledModalProps extends AntModalProps {}

export const StyledModal: React.FC<StyledModalProps> = ({
  className,
  ...props
}) => {
  return (
    <AntModal
      className={clsx(
        '[&_.ant-modal-content]:!rounded-2xl [&_.ant-modal-content]:!border-0 [&_.ant-modal-content]:!shadow-2xl',
        '[&_.ant-modal-header]:!rounded-t-2xl [&_.ant-modal-header]:!border-b [&_.ant-modal-header]:!border-gray-200 dark:[&_.ant-modal-header]:!border-gray-700',
        '[&_.ant-modal-footer]:!rounded-b-2xl [&_.ant-modal-footer]:!border-t [&_.ant-modal-footer]:!border-gray-200 dark:[&_.ant-modal-footer]:!border-gray-700',
        '[&_.ant-modal-title]:!text-lg [&_.ant-modal-title]:!font-semibold [&_.ant-modal-title]:!text-gray-900 dark:[&_.ant-modal-title]:!text-white',
        '[&_.ant-modal-close-x]:!text-gray-500 [&_.ant-modal-close-x]:!hover:text-gray-700 dark:[&_.ant-modal-close-x]:!hover:text-gray-300',
        '[&_.ant-modal-body]:!p-6',
        '[&_.ant-modal-footer]:!p-6',
        className,
      )}
      {...props}
    />
  );
};

export const Modal = StyledModal;

export default AntModal;
