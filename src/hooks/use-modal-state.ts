import { isObject } from 'lodash';
import { useCallback, useState } from 'react';

export type UseModalState = {
  open: boolean;
  modalData: Record<string, any>;
  setModal: Function;
  setOpen: Function;
};

export const useModalState = (): UseModalState => {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<Record<string, any>>({});

  const setModal = useCallback(
    (value: boolean | Record<string, any>) => {
      setOpen(!!value);
      if (isObject(value)) setModalData(value);
      else setModalData({});
    },
    [setOpen, setModalData],
  );

  return { open, setOpen, modalData, setModal };
};
