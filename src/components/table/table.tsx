import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { configResponsive, useDebounce, useResponsive } from 'ahooks';
import { Table as AntTable, Button, Checkbox, Dropdown, Flex, Pagination, Skeleton, Tooltip, theme } from 'antd';
import { Form, Input, InputNumber, Popconfirm } from 'antd';
import type { MenuProps } from 'antd';
import type { TableProps } from 'antd';
import clsx from 'clsx';
import { saveAs } from 'file-saver';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineQuestionCircle as QuestionCircleOutlined } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiFilter, CiSearch } from 'react-icons/ci';
import { FaSave, FaTimes } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';
import { MdOutlineDelete, MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiFileExcel2Line } from 'react-icons/ri';
import { TbEdit, TbLayoutColumns } from 'react-icons/tb';
import * as XLSX from 'xlsx';
import { useUpdateUser } from '@src/queries/models/user';
import { Props } from '@src/types';
import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';
import { useUserMe } from '@hooks/use-user-me';
import { getSearch } from '@utils/util';
import Error from '@components/error';
import Loading from '@components/loading';

const { Search } = Input;

// Table uchun props
type CustomTableProps<T = Record<string, any>> = TableProps<T>;
type Item = {
  key: string;
  id: number;
} & Record<string, string>;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber width={'100%'} /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const operationButtonClasses = 'bg-transparent border-none text-black shadow-none';

export type TableType = Omit<TableProps<Record<string, any>>, 'columns' | 'dataSource'> & {
  dataSource: Record<string, unknown>[];
  columns: Record<string, any>[];
  getData?: Function;
  update?: Function;
  create?: Function;
  remove?: Function;
  loading?: boolean;
  error?: boolean;
  total: number;
  add?: boolean;
  addText?: string;
  addCallback?: () => void;
  filterCallback?: () => void;
  editCallback?: (record: Record<string, any>) => void;
  removeCallback?: (record: Record<string, any>) => void;
  viewCallback?: (record: Record<string, any>) => void;
  operations?: React.FC<{ record: Record<string, any> }>[];
  hideExcelBtn?: boolean;
  hideOperationColumn?: boolean;
  hidePagination?: boolean;
  hideTitle?: boolean;
  queryKey?: unknown[];
  name?: string;
  noStyle?: boolean;
  search?: boolean;
  searchPlaceholder?: string;
  rightSide?: React.ReactNode;
  removeButton?: boolean;
  editButton?: boolean;
  isLoadingRemove?: boolean;
  noFilterColumns?: boolean;
  titleOnRemove?: (record: Record<string, any>) => string | React.ReactNode;
  setPage?: (value: number) => void;
  setPageSize?: (value: number) => void;
  leftSide?: string | React.ReactNode;
  keyName?: string;
  showCrudResultToast?: boolean;
  pageSizeName?: string;
  pageNumberName?: string;
  skeleton?: boolean;
  excelFileName?: string;
} & Props;

function Table({
  getData,
  update,
  create,
  remove,
  loading,
  error,
  total,
  add = true,
  addText,
  addCallback,
  editCallback,
  removeCallback,
  viewCallback,
  filterCallback,
  operations,
  hideExcelBtn = false,
  hideOperationColumn,
  hidePagination,
  hideTitle,
  queryKey,
  name,
  noStyle,
  search,
  searchPlaceholder,
  rightSide,
  removeButton = true,
  isLoadingRemove,
  editButton = true,
  noFilterColumns,
  titleOnRemove,
  leftSide,
  keyName,
  dataSource,
  columns,
  rowSelection,
  onRow,
  size = 'middle',
  expandable,
  onChange,
  setPage: setPageProp,
  setPageSize: setPageSizeProp,
  showCrudResultToast = false,
  pageSizeName = 'pageSize',
  pageNumberName = 'pageNumber',
  skeleton = true,
  excelFileName,
  ...props
}: TableType) {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { query, push } = useLocationParams();
  const [data, setData] = useState(dataSource);
  const [editingKey, setEditingKey] = useState('');
  const [editingRow, setEditingRow] = useState({});
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const { user, refetchMe } = useUserMe();
  const config: Record<string, any> = useMemo(() => user?.config || {}, [user]);
  const viewColumns = useMemo(() => get(config, name || '', {}), [user]);
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();
  const responsive = useResponsive();

  const isEditing = useCallback((record: Item) => record.key === editingKey, [editingKey]);
  const isCreating = !!editingKey && editingKey == '-1';
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [x, setX] = useState('');
  const searchQuery = useMemo(() => getSearch(), []);
  // const [searchText, setSearchText] = useState(get(searchQuery, 'search', '')?.slice(1));
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchInputValue, { wait: 500 });
  const idTable = useMemo(() => name || 'antd-table', [name]);

  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      push({ search: debouncedSearchTerm }, { update: true });
    } else {
      if (query.search) push({ search: undefined }, { update: true });
    }
  }, [debouncedSearchTerm, push]);

  // useEffect(() => {
  //   setSearchText(query.search?.slice(1) || '');
  // }, [query.search]);

  const setKeyToDataItems = useCallback(() => {
    let arr = dataSource ? [...dataSource] : [];
    if (arr?.length && !arr[0].key) {
      arr = arr.map((item) => ({ ...item, key: item[keyName || 'id'] }));
    }
    setData(arr);
  }, [dataSource, setData]);

  const { mutate: updateUser } = useUpdateUser(
    {
      onSuccess: () => {
        refetchMe();
      },
    },
    { invalidateQueries: ['user-me'] },
  );

  useEffect(() => {
    setKeyToDataItems();
  }, [dataSource]);

  useEffect(() => {
    getData && getData(pageSize, (page - 1) * pageSize);
  }, [page, pageSize, getData]);

  const addRow = useCallback(() => {
    setEditingKey('-1');
    setData([{ key: '-1' }, ...data]);
    form.resetFields();
  }, [form, data]);

  const edit = useCallback(
    (record: Partial<Item> & { key: React.Key }) => {
      form.setFieldsValue({ ...record });
      setEditingKey(record.key);
      setEditingRow(record);
    },
    [form],
  );

  const cancel = useCallback(() => {
    setEditingKey('');
    setKeyToDataItems();
  }, [dataSource]);

  const save = useCallback(
    async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as Item;

        const { id, key, ...rowAllData } = { ...editingRow, ...row };
        if (isCreating) {
          create &&
            create(row, null, rowAllData)
              .then((data: any) => {
                showCrudResultToast && notifySuccess('Added successfully');
              })
              .catch((error: any) => {
                console.log({ error });
                showCrudResultToast && notifyError('An error occurred');
              });
        } else {
          update &&
            update(row, id, rowAllData)
              .then((data: any) => {
                showCrudResultToast && notifySuccess('Changed successfully');
              })
              .catch((error: any) => {
                console.log({ error });
                showCrudResultToast && notifyError('An error occurred');
              });
        }
        setEditingKey('');
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    },
    [update, create, isCreating, editingRow, form],
  );

  const removeRow = useCallback(
    (record: Partial<Item> & { key: React.Key }) => {
      remove &&
        remove(+record.key)
          .then((data: any) => {
            showCrudResultToast && notifySuccess('Deleted successfully');
          })
          .catch((error: any) => {
            console.log({ error });
            showCrudResultToast && notifyError('An error occurred');
          })
          .finally(cancel);
    },
    [cancel, remove],
  );

  const operationColumn = useMemo(
    () => ({
      title: t('Amallar') || '',
      dataIndex: 'operation',
      key: 'operationOfRow',
      width: (operations?.length || 0) > 1 ? 140 : 90,
      fixed: responsive.mobile ? 'right' : undefined,
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span className={'flex gap-2'}>
            <Button type={'text'} size={'small'} onClick={() => save(record.key)}>
              <FaSave />
            </Button>
            <Popconfirm
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              title={'Do you want to cancel?'}
              onConfirm={cancel}
              okText={t('Yes') || ''}
              cancelText={t('No') || ''}
            >
              <Button type={'text'} size={'small'}>
                <FaTimes />
              </Button>
            </Popconfirm>
          </span>
        ) : (
          editingKey == '' && (
            <span className={'flex items-center gap-0'}>
              {operations?.map((Component: React.FC<{ record: Record<string, any> }>, index: number) => (
                <Component record={record} key={index} />
              ))}
              {!!viewCallback && (
                <Button size={'small'} onClick={viewCallback ? () => viewCallback(record) : () => {}} type={'text'}>
                  <MdOutlineRemoveRedEye
                    css={css`
                      width: 16px;
                      height: 16px;
                    `}
                  />
                </Button>
              )}
              {editButton && (
                <Button
                  size={'small'}
                  onClick={editCallback ? () => editCallback(record) : () => edit(record)}
                  type={'text'}
                >
                  <TbEdit
                    css={css`
                      width: 16px;
                      height: 16px;
                    `}
                  />
                </Button>
              )}
              {removeButton && (
                <Popconfirm
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  title={titleOnRemove ? titleOnRemove(record) : t('Are you sure to delete?') || ''}
                  onConfirm={removeCallback ? () => removeCallback(record) : () => removeRow(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size={'small'} type={'text'} loading={isLoadingRemove}>
                    <MdOutlineDelete
                      css={css`
                        width: 16px !important;
                        height: 16px !important;
                      `}
                    />
                  </Button>
                </Popconfirm>
              )}
            </span>
          )
        );
      },
    }),
    [
      editingKey,
      operations,
      removeCallback,
      editCallback,
      edit,
      isEditing,
      removeRow,
      save,
      cancel,
      editButton,
      removeButton,
      responsive.middle,
    ],
  );

  const mergedColumns = useMemo(() => {
    // const cols = columns.filter((item) => !item.hide);
    return (hideOperationColumn ? columns : [...columns, operationColumn]).map((col: any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          inputType: col.type || 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
  }, [hideOperationColumn, columns, operationColumn, isEditing]);

  const filteredColumns = useMemo(
    () =>
      noFilterColumns
        ? mergedColumns
        : mergedColumns.filter((item) => {
            return viewColumns && viewColumns[item.key as string]?.checked != false;
          }),
    [mergedColumns, viewColumns, noFilterColumns],
  );

  useEffect(() => {
    const isHasNoWidthColumn = filteredColumns.find((item) => !item.width);
    const table = document.getElementById(idTable);

    const getScrollWidth = () => {
      // const widthContainer = table?.getBoundingClientRect().width || window.innerWidth;
      const widthContainer = window.innerWidth;
      isHasNoWidthColumn
        ? setX(
            window && filteredColumns.length > 5
              ? `${Math.floor((filteredColumns.length / (widthContainer / 130)) * 100)}%`
              : '100%',
          )
        : setX(`${(filteredColumns.reduce((total, col) => total + col.width, 0) / widthContainer) * 100}%`);
    };

    window.onresize = getScrollWidth;
    // if (table) table.onscroll = getScrollWidth;
    getScrollWidth();
  }, [filteredColumns]);

  useEffect(() => {
    setTimeout(() => {
      const searchQuery = getSearch();

      if (!hidePagination && (!searchQuery.pageSize || !searchQuery.pageNumber) && !(setPageProp && setPageSizeProp))
        push(
          {
            pageSize: searchQuery.pageSize || 10,
            pageNumber: searchQuery.pageNumber || 1,
            search: '',
            field: '',
            order: '',
            ...searchQuery,
          },
          { replace: true, update: true },
        );
    }, 100);
  }, []);

  const onFilterColumn = (checked: boolean, key: string) => {
    const obj = { ...viewColumns, [key]: { checked } };
    if (name)
      updateUser({
        where: { id: user?.id },
        data: { config: { ...config, [name]: obj } },
        select: { id: true, config: true },
      });
  };

  const items: MenuProps['items'] = mergedColumns.map((item) => {
    return {
      key: item.key as string,
      label: (
        <>
          <Checkbox
            checked={viewColumns[item.key as string]?.checked != false}
            // onChange={(e) => onFilterColumn(e.target.checked, item.key as string)}
            onChange={(e) => {}}
            className={'mr-2'}
          ></Checkbox>
          {item.title as string}
        </>
      ),
    };
  });

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const handleExport = useCallback(() => {
    const table = document.getElementById(idTable);
    if (table) {
      const ws = XLSX.utils.table_to_sheet(table);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Table');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${excelFileName || idTable}.xlsx`);
    }
  }, []);

  const skeletonData = useMemo(
    () => new Array(10).fill(columns.map((item) => ({ [item.dataIndex]: <Skeleton active /> }))),
    [columns],
  );

  const skeletonColumns = useMemo(
    () =>
      columns.map((item) => ({
        ...item,
        render: () => (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px' }}>
            <Skeleton active title={{ width: '80%' }} paragraph={false} />
          </div>
        ),
      })),
    [columns],
  );

  return (
    <>
      <Form form={form} component={false}>
        {error ? (
          <Error />
        ) : (
          <div>
            {/*@ts-ignore*/}
            {/*<Fade duration={500}>*/}
            <AntTable
              css={css`
                background: transparent;
                width: 100%;

                .ant-table {
                  background: transparent;
                }

                .ant-table > .ant-table-title {
                  padding-inline: 0 !important;
                }

                .ant-table-thead {
                  th {
                    //background: transparent !important;
                    font-weight: 400 !important;
                  }
                }

                .ant-input-number.ant-input-number-in-form-item {
                  width: 100%;
                }

                .editable-row .ant-form-item-explain {
                  position: absolute;
                  top: 100%;
                  font-size: 12px;
                }

                .noStyle {
                  .ant-table {
                    margin: 0 !important;
                    margin-block: -16px !important;
                  }
                }

                .ant-table-container {
                  overflow-x: auto !important;
                  overflow-y: hidden;
                }
              `}
              id={idTable}
              className={clsx({ noStyle })}
              dataSource={loading && skeleton ? skeletonData : data}
              // @ts-ignore
              columns={loading && skeleton ? skeletonColumns : filteredColumns}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              loading={loading}
              locale={{ emptyText: t(`Ma'lumot yoq`) }}
              rowClassName="editable-row"
              // pagination={{
              //   onChange: cancel,
              // }}
              rowSelection={rowSelection}
              onRow={onRow}
              pagination={false}
              scroll={{ x }}
              size={size}
              expandable={expandable}
              onChange={onChange}
              title={
                hideTitle
                  ? undefined
                  : () => (
                      <div
                        className={
                          'flex justify-between items-start gap-2 p-1 rounded-lg flex-wrap dark:bg-[#ffffff05] bg-[#f7f9fb] overflow-x-auto'
                        }
                      >
                        {/*<p className={'font-bold'}>{name || 'Data'}</p>*/}
                        {/*<p className={'font-bold'}>Total: {total}</p>*/}
                        <div className={'flex-1 flex gap-2 flex-wrap'}>{leftSide}</div>

                        <div className={'flex items-center gap-0'}>
                          {loading && <Loading />}
                          {rightSide}
                          {search && (
                            // <Search
                            //   style={{ width: 220 }}
                            //   className={'mx-2 bg-transparent py-0.5'}
                            //   placeholder={searchPlaceholder}
                            //   allowClear
                            //   // @ts-ignore
                            //   value={searchText || ''}
                            //   onChange={(value) => {
                            //     setSearchText(value.target.value);
                            //   }}
                            //   onSearch={(value: string) =>
                            //     push(
                            //       {
                            //         search: 's' + value,
                            //         pageNumber: 1,
                            //       },
                            //       { update: true },
                            //     )
                            //   }
                            // />
                            <Input
                              prefix={<CiSearch />}
                              className={'mx-2 bg-transparent py-0.5 border-[1px] border-gray-200 dark:border-gray-600'}
                              placeholder={searchPlaceholder}
                              allowClear
                              onChange={(event) => setSearchInputValue(event.target.value)}
                            />
                          )}
                          <>
                            {queryKey && (
                              <Tooltip title={t('Qayta yuklash') || ''}>
                                <Button
                                  type={'text'}
                                  onClick={() => queryClient.invalidateQueries({ queryKey })}
                                  disabled={isCreating}
                                >
                                  <IoMdRefresh className={'mr-1'} />
                                </Button>
                              </Tooltip>
                            )}
                            {!!filterCallback && (
                              // <Tooltip title={t('Filter')}>
                              <Button type={'text'} onClick={filterCallback} disabled={isCreating}>
                                <CiFilter className={''} /> {t('Filter')}
                              </Button>
                              // </Tooltip>
                            )}
                            {add && (
                              // <Tooltip title={t(`Yangi qo'shish`)}>
                              <Button type={'text'} onClick={addCallback || addRow} disabled={isCreating}>
                                <AiOutlinePlus className={''} />
                                {addText || t(`Yangi qo'shish`) || ''}
                              </Button>
                              // </Tooltip>
                            )}
                            {hideExcelBtn === false && (
                              <Tooltip title={t('Excelga export') || ''}>
                                <Button type={'text'} onClick={handleExport} disabled={isCreating}>
                                  <RiFileExcel2Line className={'mr-1'} />
                                  <span className={'hidden sm:inline-block'}>{t('Excel')}</span>
                                </Button>
                              </Tooltip>
                            )}
                            {!noFilterColumns && (
                              <Dropdown
                                menu={{
                                  items,
                                  onClick: (e) => {
                                    onFilterColumn(!(viewColumns[e.key]?.checked != false), e.key as string);
                                    setTimeout(() => {
                                      setOpenFilterDropdown(true);
                                    }, 1);
                                  },
                                }}
                                placement="bottomRight"
                                arrow
                                open={openFilterDropdown}
                                onOpenChange={(
                                  flag: boolean,
                                  info: {
                                    source: 'trigger' | 'menu';
                                  },
                                ) => {
                                  setOpenFilterDropdown(flag);
                                }}
                                trigger={['click']}
                                dropdownRender={(menu) => (
                                  <div style={contentStyle}>
                                    {/*{React.cloneElement(menu as React.ReactElement, { style: menuStyle })}*/}
                                    {/*<Divider style={{ margin: 0 }} />*/}
                                    <Flex vertical gap={5} style={{ padding: 8 }}>
                                      {items?.map((item) => (
                                        <div
                                          key={item?.key}
                                          onClick={() => {
                                            onFilterColumn(
                                              !(viewColumns[item?.key as string]?.checked != false),
                                              item?.key as string,
                                            );
                                          }}
                                          className={'cursor-pointer'}
                                        >
                                          {/*@ts-ignore*/}
                                          {item?.label}
                                        </div>
                                      ))}
                                    </Flex>
                                  </div>
                                )}
                              >
                                <Tooltip title={t('Ustunlar') || ''}>
                                  <Button type={'text'}>
                                    <TbLayoutColumns />
                                    <span className={'hidden sm:inline-block'}>{t('Ustunlar') || ''}</span>
                                  </Button>
                                </Tooltip>
                              </Dropdown>
                            )}
                          </>
                        </div>
                      </div>
                    )
              }
              {...props}
            />
            {/*<div className={'flex justify-between items-center my-1'}>*/}
            {/*  <span className={'font-bold'}>Total: {total}</span>*/}
            {!hidePagination && (
              <div className={'flex justify-center mt-2'}>
                <Pagination
                  current={(query?.[pageNumberName] || 1) as number}
                  pageSize={(query?.[pageSizeName] || 10) as number}
                  total={total}
                  // showQuickJumper
                  size="small"
                  onChange={(pageNumber) => {
                    setPage(pageNumber);
                    cancel();

                    if (setPageProp && setPageSizeProp) setPageProp(pageNumber);
                    else if (Number(query?.[pageNumberName]) != pageNumber)
                      push({ pageNumber }, { update: true, replace: true });
                  }}
                  onShowSizeChange={(current, pageSize) => {
                    setPageSize(pageSize);
                    setPage(1);
                    if (setPageSizeProp && setPageProp) {
                      setPageProp(1);
                      setPageSizeProp(pageSize);
                    } else {
                      push({ [pageSizeName]: pageSize, [pageNumberName]: 1 }, { update: true, replace: true });
                    }
                  }}
                  pageSizeOptions={['10', '20', '50', '100', '300']}
                  // showTotal={(total, range) => t('pagination', { n: range[0], m: range[1], t: total })}
                  showTotal={(total, range) =>
                    responsive.middle
                      ? t('pagination', { n: range[0], m: range[1], t: total })
                      : `${range[0]}-${range[1]} / ${total}`
                  }
                  // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                  // showTotal={(total, range) => `Total: ${total}, ${range[0]}-${range[1]}`}
                  // showTotal={(total, range) => `${range[0]}-${range[1]}`}
                  css={css`
                    padding: 0.4rem 1rem;
                  `}
                />
              </div>
            )}
            {/*</Fade>*/}
          </div>
        )}
      </Form>
    </>
  );
}

export default observer(Table);

export const AntTableStyled = styled(AntTable)`
  background: transparent;
  width: 100%;

  .ant-table {
    background: transparent;
  }

  .ant-table > .ant-table-title {
    padding-inline: 0 !important;
  }

  .ant-table-thead {
    th {
      //background: transparent !important;
      font-weight: 400 !important;
    }
  }

  .ant-input-number.ant-input-number-in-form-item {
    width: 100%;
  }

  .editable-row .ant-form-item-explain {
    position: absolute;
    top: 100%;
    font-size: 12px;
  }

  .noStyle {
    .ant-table {
      margin: 0 !important;
      margin-block: -16px !important;
    }
  }

  .ant-table-body {
    overflow: auto !important;
  }
`;
