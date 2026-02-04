import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useResponsive, useSetState } from 'ahooks';
import { Button, Dropdown, Input, Modal, Space } from 'antd';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useTranslation } from 'react-i18next';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { MdOutlineColorLens } from 'react-icons/md';

import { useApi } from '@src/api';
import { useStore } from '@src/stores/stores';
import { useNotification } from '@hooks/use-notification';

const { TextArea } = Input;
// function useMasonryCount() {
//   const responsive = useResponsive();
//   const [masonryColumns, setMasonryColumns] = useState<number>(5);
//   useEffect(() => {
//     if (responsive.xs) {
//       setMasonryColumns(1); // Kichik ekranlar uchun 1 ustun
//     } else if (responsive.sm) {
//       setMasonryColumns(2); // Kichik ekranlar uchun 2 ustun
//     } else if (responsive.md) {
//       setMasonryColumns(3); // O'rta ekranlar uchun 3 ustun
//     } else if (responsive.lg) {
//       setMasonryColumns(4); // Katta ekranlar uchun 4 ustun
//     } else if (responsive.xl) {
//       setMasonryColumns(5); // Juda katta ekranlar uchun 5 ustun
//     } else {
//       setMasonryColumns(1);
//     }
//   }, [responsive]);
//   return masonryColumns;
// }

export const Notes = observer(() => {
  const api = useApi();
  const queryClient = useQueryClient();
  const { user } = useStore().layoutStore;
  const { notifySuccess, notifyError } = useNotification();

  const [openNote, setOpenNote] = useState(false);
  const [note, setNote] = useSetState({
    title: '',
    content: '',
    background: '',
  });
  const colors = [
    '',
    '#faafa7',
    '#f39f76',
    '#fff8b8',
    '#e2f5d3',
    '#b4ddd3',
    '#d4e3ed',
    '#aeccdc',
    '#d3bfdb',
    '#f6e2dd',
    '#e9e3d3',
    '#efeff1',
  ];

  const [editModal, setEditModal] = useSetState({
    isOpen: false,
    id: null,
    background: 'white',
    title: '',
    content: '',
  });
  const ref = useDetectClickOutside({ onTriggered: handleCloseNote, triggerKeys: ['Escape'] });

  const { data: notesData } = useQuery(['notes'], () => api.apis.Notes.findMany({ where: { userId: user?.id } }), {
    enabled: !!user?.id,
  });

  const { mutate: createNote } = useMutation(
    (data: Record<string, any>) => api.apis.Notes.createOne({ data: { ...data, userId: user?.id } }),
    {
      onSuccess: () => {
        notifySuccess(`Muvaffaqiyatli qo'shildi`);
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        setNote({ title: '', content: '', background: '' });
      },
      onError: () => notifyError(`Xatolik sodir bo'ldi`),
    },
  );

  const { mutate: deleteNode } = useMutation(
    (data: Record<string, any>) => api.apis.Notes.deleteOne({ where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess(`Muvaffaqiyatli o'chirildi`);
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
      onError: () => notifyError(`Xatolik sodir bo'ldi`),
    },
  );

  const { mutate: editNote } = useMutation(
    (data: Record<string, any>) => api.apis.Notes.updateOne({ data: data, where: { id: data.id } }),
    {
      onSuccess: () => {
        notifySuccess(`Muvaffaqiyatli o'zgartirildi`);
        queryClient.invalidateQueries({ queryKey: ['notes'] });
      },
      onError: () => notifyError(`Xatolik sodir bo'ldi`),
    },
  );

  function handleOpenNote() {
    setOpenNote(true);
  }
  function handleCloseNote() {
    setOpenNote(false);
  }
  function handleCreateNote() {
    if (note.title === '' && note.content === '') {
      setOpenNote(false);
    } else createNote(note);
  }
  function handleDeleteNote(id: number | null) {
    if (!id) {
      setOpenNote(false);
      setNote({ title: '', content: '' });
    } else deleteNode({ id });
  }
  function handleBgColor(color: string) {
    setNote({ background: color });
  }
  function handleOpenEditModal(data: any) {
    setEditModal({ isOpen: true, title: data.title, content: data.content, background: data.background, id: data.id });
  }
  function handleCloseEditModal() {
    setEditModal({ isOpen: false });
  }
  function handleEditOk({ title, content, background, id }: any) {
    editNote({ title, content, background, id });
    setEditModal({ isOpen: false, id: null, background: 'white', title: '', content: '' });
  }
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center w-full pb-3">
      <div
        className={
          'w-full md:w-2/3  p-4 shadow-md  bg-white dark:bg-stone-900 rounded-md' +
          (note.background !== ''
            ? '  placeholder:text-gray-900' + '   dark:placeholder:text-gray-900' + ' dark:text-black'
            : '  placeholder:text-gray-400' + '   dark:placeholder:text-gray-300' + ' dark:text-white ')
        }
        style={note.background !== '' ? { background: note.background } : {}}
        ref={ref}
        onClick={handleOpenNote}
      >
        {!openNote ? (
          t('Eslatmalar') || ''
        ) : (
          <>
            <TextArea
              value={note.title}
              className={
                'border-none focus:shadow-none font-semibold' +
                ' bg-transparent' +
                (note.background !== ''
                  ? '  placeholder:text-gray-500' + '   dark:placeholder:text-gray-500' + ' dark:text-black'
                  : '  placeholder:text-gray-400' + '   dark:placeholder:text-gray-300' + ' dark:text-white ')
              }
              placeholder={t('Sarlavhani kiriting') || ''}
              autoSize
              onChange={(e) => setNote({ title: e.target.value })}
            />
            <TextArea
              value={note.content}
              className={
                'border-none focus:shadow-none' +
                ' bg-transparent' +
                (note.background !== ''
                  ? '  placeholder:text-gray-500' + '   dark:placeholder:text-gray-500' + ' dark:text-black'
                  : '  placeholder:text-gray-400' + '   dark:placeholder:text-gray-300' + ' dark:text-white ')
              }
              placeholder={t('Eslatmalar') || ''}
              autoSize
              onChange={(e) => setNote({ content: e.target.value })}
            />
            <div className="flex justify-between mt-5 align-middle">
              <div className="flex gap-2">
                <Dropdown
                  trigger={['click']}
                  dropdownRender={(menu) => (
                    <div className="flex gap-2 px-4 py-2 bg-white rounded-lg shadow-md dark:bg-stone-900 dark:shadow-white dark:shadow-inner">
                      {colors.map((item, idx) => (
                        <div
                          key={idx}
                          className="rounded-full w-7 h-7"
                          style={item ? { background: item } : { border: '1px solid gray' }}
                          onClick={(event) => {
                            handleBgColor(item);
                            event.stopPropagation();
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                  placement="bottomLeft"
                >
                  <Button
                    className={
                      'bg-transparent border-none ' +
                      ' rounded-md px-4' +
                      (note.background !== ''
                        ? ' text-black' + ' hover:shadow-md'
                        : ' dark:text-white' + ' hover:shadow-[#6b6b6b44] hover:shadow-sm')
                    }
                    css={css`
                      :where(.css-dev-only-do-not-override-1iozd49).ant-btn-default:not(:disabled):not(
                          .ant-btn-disabled
                        ):hover {
                        border: none;
                        ${note.background !== '' ? { color: 'black' } : { color: 'white' }};
                      }
                      :where(.css-dev-only-do-not-override-12ge9jn).ant-btn-default:not(:disabled):not(
                          .ant-btn-disabled
                        ):hover {
                        border: none;
                        color: black;
                      }
                    `}
                  >
                    <MdOutlineColorLens />
                  </Button>
                </Dropdown>
                <Dropdown
                  trigger={['click']}
                  dropdownRender={(menu) => (
                    <Space className="p-5 rounded-md shadow-lg" style={{ padding: 8, background: note.background }}>
                      <Button onClick={() => handleDeleteNote(null)}>{t('delete') || ''}</Button>
                    </Space>
                  )}
                  placement="bottom"
                >
                  <Button
                    type={'text'}
                    className={
                      'bg-transparent border-none shadow-none' +
                      ' rounded-md px-4 ' +
                      (note.background !== ''
                        ? 'text-black' + ' hover:shadow-md'
                        : 'dark:text-white' + ' hover:shadow-[#6b6b6b44] hover:shadow-sm')
                    }
                    css={css`
                      :where(.css-dev-only-do-not-override-1iozd49).ant-btn-default:not(:disabled):not(
                          .ant-btn-disabled
                        ):hover {
                        border: none;
                        ${note.background !== '' ? { color: 'black' } : { color: 'white' }};
                      }
                      :where(.css-dev-only-do-not-override-12ge9jn).ant-btn-default:not(:disabled):not(
                          .ant-btn-disabled
                        ):hover {
                        border: none;
                        color: black;
                      }
                    `}
                  >
                    <BiDotsVerticalRounded />
                  </Button>
                </Dropdown>
              </div>

              <Button
                className={
                  'bg-transparent border-none' +
                  '  rounded-md px-4 ' +
                  (note.background !== ''
                    ? 'text-black' + ' hover:shadow-md'
                    : 'dark:text-white' + ' hover:shadow-[#6b6b6b44] hover:shadow-sm')
                }
                onClick={handleCreateNote}
                css={css`
                  :where(.css-dev-only-do-not-override-1iozd49).ant-btn-default:not(:disabled):not(
                      .ant-btn-disabled
                    ):hover {
                    border: none;
                    ${note.background !== '' ? { color: 'black' } : { color: 'white' }};
                  }
                  :where(.css-dev-only-do-not-override-12ge9jn).ant-btn-default:not(:disabled):not(
                      .ant-btn-disabled
                    ):hover {
                    border: none;
                    color: black;
                  }
                `}
              >
                {t('add') || ''}
              </Button>
            </div>
          </>
        )}
      </div>

      <Modal
        css={css`
          :where(.css-dev-only-do-not-override-1yn2s4x).ant-modal .ant-modal-content {
            background: ${editModal.background};
          }
          :where(.css-dev-only-do-not-override-1wjxfr1).ant-modal .ant-modal-content {
            background: ${editModal.background};
          }
        `}
        open={editModal.isOpen}
        onCancel={handleCloseEditModal}
        onOk={() => handleEditOk(editModal)}
        okText={'Saqlash'}
      >
        <TextArea
          value={editModal.title}
          placeholder={t('Sarlavhani kiriting') || ''}
          className={
            'border-none focus:shadow-none font-semibold' +
            ' bg-transparent' +
            (editModal.background !== ''
              ? '  placeholder:text-gray-500' + '   dark:placeholder:text-gray-500' + ' dark:text-white'
              : '  placeholder:text-gray-400' + '   dark:placeholder:text-gray-300' + ' dark:text-white ')
          }
          autoSize
          onChange={(e) => setEditModal({ title: e.target.value })}
        />
        <TextArea
          value={editModal.content}
          placeholder={t('Eslatmalar') || ''}
          className={
            'border-none focus:shadow-none' +
            ' bg-transparent' +
            (editModal.background !== ''
              ? '  placeholder:text-gray-500' + '   dark:placeholder:text-gray-500' + ' dark:text-white'
              : '  placeholder:text-gray-400' + '   dark:placeholder:text-gray-300' + ' dark:text-white ')
          }
          autoSize
          onChange={(e) => setEditModal({ content: e.target.value })}
        />
        <div className="flex justify-between mt-5 align-middle">
          <div className="flex gap-2">
            <Dropdown
              trigger={['click']}
              dropdownRender={(menu) => (
                <div className="flex gap-2 px-4 py-3 bg-white rounded-lg shadow-md dark:bg-stone-900">
                  {colors.map((item, idx) => (
                    <div
                      key={idx}
                      className="w-6 h-6 rounded-full "
                      style={item ? { background: item } : { border: '1px solid gray' }}
                      onClick={() => setEditModal({ background: item })}
                    ></div>
                  ))}
                </div>
              )}
              placement="bottomLeft"
            >
              <Button
                className={
                  'bg-transparent dark:text-white border-none' +
                  ' rounded-md px-4 ' +
                  (editModal.background !== ''
                    ? 'text-black' + ' hover:shadow-md'
                    : 'dark:text-white' + ' hover:shadow-[#6b6b6b44] hover:shadow-sm')
                }
                css={css`
                  :where(.css-dev-only-do-not-override-1iozd49).ant-btn-default:not(:disabled):not(
                      .ant-btn-disabled
                    ):hover {
                    border: none;
                    ${editModal.background !== '' ? { color: 'black' } : { color: 'white' }};
                  }
                  :where(.css-dev-only-do-not-override-12ge9jn).ant-btn-default:not(:disabled):not(
                      .ant-btn-disabled
                    ):hover {
                    border: none;
                    color: black;
                  }
                `}
                onClick={(event) => event.stopPropagation()}
              >
                <MdOutlineColorLens />
              </Button>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              dropdownRender={(menu) => (
                <Space className="rounded-md shadow-lg" style={{ background: note.background }}>
                  <Button
                    onClick={() => {
                      handleDeleteNote(editModal.id);
                      setEditModal({ isOpen: false });
                    }}
                  >
                    {t('delete')}
                  </Button>
                </Space>
              )}
              placement="bottom"
            >
              <Button
                className={
                  'bg-transparent border-none dark:text-white' +
                  ' rounded-md px-4 ' +
                  (editModal.background !== ''
                    ? 'text-black' + ' hover:shadow-md'
                    : 'dark:text-white' + ' hover:shadow-[#6b6b6b44] hover:shadow-sm')
                }
                css={css`
                  :where(.css-dev-only-do-not-override-1iozd49).ant-btn-default:not(:disabled):not(
                      .ant-btn-disabled
                    ):hover {
                    border: none;
                    ${editModal.background !== '' ? { color: 'black' } : { color: 'white' }};
                  }
                  :where(.css-dev-only-do-not-override-12ge9jn).ant-btn-default:not(:disabled):not(
                      .ant-btn-disabled
                    ):hover {
                    border: none;
                    color: black;
                  }
                `}
                onClick={(event) => event.stopPropagation()}
              >
                <BiDotsVerticalRounded />
              </Button>
            </Dropdown>
          </div>
        </div>
      </Modal>

      <div className="w-full mt-8 columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5">
        {notesData?.data.data?.map((item: Record<string, any>) => (
          <div
            className="p-4 max-h-[300px] rounded-md shadow-md bg-white dark:bg-stone-900  break-inside-avoid mb-5 "
            style={{ background: item.background }}
            key={item.id}
            onClick={() => handleOpenEditModal(item)}
          >
            <div className="max-h-[200px] overflow-hidden mb-5">
              <p
                className={
                  'text-xl whitespace-pre-wrap text-ellipsis' +
                  '  font-medium overflow-hidden' +
                  ' ' +
                  (item.background !== '' ? 'text-gray-800' : '')
                }
              >
                {item.title}
              </p>
              <p
                className={
                  'whitespace-pre-wrap overflow-hidden' +
                  ' text-ellipsis ' +
                  (item.background !== '' ? 'text-gray-900' : '')
                }
              >
                {item.content}
              </p>
            </div>

            <div className="flex justify-end mt-5">
              <Dropdown
                trigger={['click']}
                dropdownRender={(menu) => (
                  <Space className="rounded-md shadow-lg" style={{ background: note.background }}>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteNote(item.id);
                      }}
                    >
                      {t('delete') || ''}
                    </Button>
                  </Space>
                )}
                placement="bottom"
              >
                <Button
                  className={
                    'bg-transparent text-black shadow-none' +
                    ' border-none rounded-md px-4' +
                    ' hover:shadow ' +
                    (item.background !== ''
                      ? 'text-black' + ' hover:shadow-md'
                      : 'dark:text-white' + ' hover:shadow-[#6b6b6b44]')
                  }
                  css={css`
                    :where(.css-dev-only-do-not-override-1iozd49).ant-btn-default:not(:disabled):not(
                        .ant-btn-disabled
                      ):hover {
                      border: none;
                      ${item.background !== '' ? { color: 'black' } : { color: 'white' }};
                    }
                    :where(.css-dev-only-do-not-override-12ge9jn).ant-btn-default:not(:disabled):not(
                        .ant-btn-disabled
                      ):hover {
                      border: none;
                      color: black;
                    }
                  `}
                  onClick={(event) => event.stopPropagation()}
                >
                  <BiDotsVerticalRounded />
                </Button>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
