import styled from '@emotion/styled';
import { useLocalStorageState } from 'ahooks';
import { Button, Checkbox, Dropdown, Empty, Form, Input, MenuProps, Popconfirm, Tooltip } from 'antd';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFilter } from 'react-icons/bs';
import { Column, useBlockLayout, useTable } from 'react-table';
import { FixedSizeList } from 'react-window';
import Error from '@components/error';
import Loading from '@components/loading';
import { Numeric } from '@components/table/components';
import { getSearch, priceFormatter } from '@utils/util';
import { useLocationParams } from '@hooks/use-location-params';
import { useTranslation } from 'react-i18next';
import { MdOutlineDelete, MdOutlineRemoveRedEye } from 'react-icons/md';
import { css } from '@emotion/react';
import { TbEdit, TbLayoutColumns } from 'react-icons/tb';
import { AiOutlineQuestionCircle as QuestionCircleOutlined } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import { IoMdRefresh } from 'react-icons/io';
import { CiFilter, CiSearch } from 'react-icons/ci';

const { Search } = Input;

type Item = {
  key: string;
  id: number;
} & Record<string, string>;

export const numericColumnRCTable = () => ({
  Header: '#',
  accessor: (row: Record<string, any>, i: number) => <Numeric>{priceFormatter(i + 1)}</Numeric>,
  width: 60,
});

export const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute('style', 'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;');
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

export default function VirtualTable({
  columns,
  data,
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
  hideOperationColumn,
  hidePagination,
  name,
  noStyle,
  search,
  searchPlaceholder,
  rightSide,
  removeButton = true,
  editButton = true,
  isLoadingRemove,
  noFilterColumns,
  titleOnRemove,
  rowSelection,
  leftSide,
  queryKey,
  itemHeight,

  // rowSelection,
  // onRow,
  // size = 'middle',
  // expandable,
  // onChange,

  ...props
}: {
  columns: (Column<Record<string, any>> & { hide?: boolean })[];
  data?: Record<string, any>[];

  update?: Function;
  create?: Function;
  remove?: Function;
  loading?: boolean;
  error?: boolean;
  total: number;
  add?: boolean;
  addText?: string;
  addCallback?: () => void;
  editCallback?: (record: Record<string, any>) => void;
  removeCallback?: (record: Record<string, any>) => void;
  viewCallback?: (record: Record<string, any>) => void;
  filterCallback?: (record: Record<string, any>) => void;
  operations?: React.FC<{ record: Record<string, any> }>[];
  hideOperationColumn?: boolean;
  hidePagination?: boolean;
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
  rowSelection?: { selectedRowKeys: React.Key[]; onChange: (newSelectedRowKeys: React.Key[]) => void };
  leftSide?: string | React.ReactNode;
  queryKey?: unknown[];
  itemHeight?: number;
}) {
  const router = useRouter();
  const { query, push } = useLocationParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  // const [filterColumns, setFilterColumns] = useState<Record<string, any>>({});
  const [filterColumns, setFilterColumns] = useLocalStorageState<Record<string, any>>(`table-columns-${name}`, {
    defaultValue: {},
  });
  const [openFilterDropdown, setOpenFilterDropdown] = useState(false);
  const searchQuery = useMemo(() => getSearch(), []);
  const [searchText, setSearchText] = useState(get(searchQuery, 'search', '')?.slice(1));
  const [selectedRowKeys, setSelectedRowKeys] = useState<Record<string | number, boolean | undefined>>({});

  const defaultColumn = useMemo(
    () => ({
      width: 150,
    }),
    [],
  );

  const scrollBarSize = useMemo(() => scrollbarWidth(), []);

  const mergedColumns = useMemo(
    () =>
      hideOperationColumn
        ? columns
        : [
            ...columns,
            {
              id: 'operations',
              Header: t('Amallar'),
              width: 100 + (operations?.length || 0) * 16,
              accessor: (record: Record<string, any>) => {
                return (
                  <span className={'flex items-center gap-0'}>
                    {operations?.map((Component: React.FC<{ record: Record<string, any> }>, index: number) => (
                      <Component record={record} key={index} />
                    ))}
                    {!!viewCallback && (
                      <Button
                        size={'small'}
                        onClick={viewCallback ? () => viewCallback(record) : () => {}}
                        type={'text'}
                      >
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
                        onClick={editCallback ? () => editCallback(record) : () => {}}
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
                        title={titleOnRemove ? titleOnRemove(record) : t('Oʻchirishga ishonchingiz komilmi?')}
                        onConfirm={removeCallback ? () => removeCallback(record) : () => {}}
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
                );
              },
            },
          ],
    [hideOperationColumn, columns, operations, removeCallback, viewCallback, editCallback],
  );

  useEffect(() => {
    setSelectedRowKeys({});
    rowSelection?.onChange([]);
  }, [data]);

  useEffect(() => {
    if (noFilterColumns || Object.keys(filterColumns || {}).length === mergedColumns.length) return;
    let obj: Record<string, any> = {};
    mergedColumns.map((item) => {
      obj[item.Header as string] = { key: item.Header as string, checked: !item.hide };
    });

    setFilterColumns(obj);
  }, [mergedColumns, noFilterColumns, setFilterColumns, filterColumns]);

  const filteredColumns = useMemo(
    () =>
      noFilterColumns
        ? mergedColumns
        : mergedColumns.filter((item) => filterColumns && filterColumns[item.Header as string]?.checked),
    [columns, filterColumns, noFilterColumns],
  );

  const allSelectedRowKeys = useMemo(() => {
    return (
      data?.reduce(
        (previousValue, currentValue) => ({
          ...previousValue,
          [currentValue.key]: true,
        }),
        {},
      ) || {}
    );
  }, [data]);

  const visibleColumns = useMemo(
    () => [
      ...(rowSelection
        ? [
            {
              id: 'checkbox',
              Header: (
                <Checkbox
                  indeterminate={
                    rowSelection.selectedRowKeys.length > 0 && rowSelection.selectedRowKeys.length < (data?.length || 0)
                  }
                  checked={!!data?.length && rowSelection.selectedRowKeys.length === (data?.length || 0)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRowKeys(allSelectedRowKeys);
                      rowSelection.onChange(data?.map((row) => row.key) || []);
                    } else {
                      setSelectedRowKeys({});
                      rowSelection.onChange([]);
                    }
                  }}
                />
              ),
              accessor: (row: Record<string, any>) => (
                <Checkbox
                  checked={selectedRowKeys[row.key]}
                  onChange={(e) => {
                    const keys = { ...selectedRowKeys, [row.key]: e.target.checked };
                    setSelectedRowKeys(keys);
                    rowSelection.onChange(
                      Object.entries(keys)
                        .filter(([key, value]) => !!value)
                        .map(([key]) => key),
                    );
                  }}
                />
              ),
              width: 50,
            },
          ]
        : []),
      ...filteredColumns,
    ],
    [rowSelection, filteredColumns, selectedRowKeys],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, totalColumnsWidth, prepareRow } = useTable(
    {
      columns: visibleColumns,
      data: data || [],
      defaultColumn,
    },
    useBlockLayout,
  );

  const RenderRow = useCallback(
    ({ index, style }: any) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div {...row.getRowProps({ style })} className="tr">
          {row.cells.map((cell, index) => {
            return (
              <div {...cell.getCellProps()} className="td" key={index}>
                {cell.render('Cell')}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows],
  );

  const onFilterColumn = (checked: boolean, key: string) => {
    setFilterColumns({ ...filterColumns, [key]: { key: key, checked } });
    // localStorage
  };

  const items: MenuProps['items'] = mergedColumns.map((item) => ({
    key: item.Header as string,
    label: (
      <>
        <Checkbox
          checked={filterColumns && !!filterColumns[item.Header as string]?.checked}
          // onChange={(e) => onFilterColumn(e.target.checked, item.key as string)}
          onChange={(e) => {}}
          className={'mr-2'}
        ></Checkbox>
        {item.Header as string}
      </>
    ),
  }));

  // Render the UI for your table
  return error ? (
    <Error />
  ) : (
    <StyledTable>
      <div
        className={
          'flex justify-between items-center gap-2 p-1 pl-2 rounded-lg flex-wrap dark:bg-[#ffffff05] bg-[#f7f9fb] overflow-x-auto'
        }
      >
        {/*<p className={'font-bold'}>{name || 'Data'}</p>*/}
        {/*<p className={'font-bold'}>Total: {total}</p>*/}
        <div className={'flex-1 flex gap-2 flex-wrap'}>{leftSide}</div>

        <div className={'flex items-center gap-2'}>
          {loading && <Loading />}
          {rightSide}
          {search && (
            <Search
              placeholder="search"
              allowClear
              // @ts-ignore
              value={searchText || ''}
              onChange={(value) => {
                setSearchText(value.target.value);
              }}
              onSearch={(value: string) => push({ search: 's' + value }, { update: true })}
              style={{ width: 300 }}
            />
            // <Input
            //   prefix={<CiSearch />}
            //   className={'mx-2 bg-transparent py-0.5 border-[1px] border-gray-200 dark:border-gray-600'}
            //   placeholder={searchPlaceholder}
            //   allowClear
            //   onChange={(event) => setSearchText(event.target.value)}
            // />
          )}
          <>
            {queryKey && (
              <Tooltip title={t('Qayta yuklash')}>
                <Button type={'text'} onClick={() => queryClient.invalidateQueries({ queryKey })}>
                  <IoMdRefresh className={'mr-1'} />
                </Button>
              </Tooltip>
            )}
            {!!filterCallback && (
              // <Tooltip title={t('Filter')}>
              <Button type={'text'} onClick={filterCallback}>
                <CiFilter className={''} /> {t('Filter')}
              </Button>
              // </Tooltip>
            )}
            {add && (
              // <Tooltip title={t(`Yangi qo'shish`)}>
              <Button type={'text'} onClick={addCallback}>
                <AiOutlinePlus className={''} />
                {addText || t(`Yangi qo'shish`)}
              </Button>
              // </Tooltip>
            )}
            {!noFilterColumns && (
              <Dropdown
                menu={{
                  items,
                  onClick: (e) => {
                    onFilterColumn(!!filterColumns && !filterColumns[e.key]?.checked, e.key as string);
                    // setOpenFilterDropdown(true);
                  },
                }}
                placement="bottomRight"
                arrow
                open={openFilterDropdown}
                onOpenChange={(flag: boolean) => {
                  setOpenFilterDropdown(flag);
                }}
              >
                <Tooltip title={t('Ustunlar')}>
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
      {!data?.length ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <div {...getTableProps()} className="table">
          <div>
            {headerGroups.map((headerGroup, index) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr" key={index}>
                {headerGroup.headers.map((column, indexColumn) => (
                  <div {...column.getHeaderProps()} className="th" key={indexColumn}>
                    {column.render('Header')}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            <FixedSizeList
              height={600}
              itemCount={rows.length}
              itemSize={itemHeight || 35}
              width={totalColumnsWidth + scrollBarSize}
            >
              {RenderRow}
            </FixedSizeList>
          </div>
        </div>
      )}
      {total && <p className={'font-bold'}>Total: {total}</p>}
    </StyledTable>
  );
}

const StyledTable = styled.div`
  .table {
    display: inline-block;
    border-spacing: 0;
    overflow: auto;
    max-width: 100%;

    .thead {
      margin-bottom: 10px;
    }

    .tr {
      border-bottom: 1px solid #f0f0f0;

      :last-child {
        .td {
          border-bottom: 0;
        }
      }
    }

    .th {
      font-weight: bold;
    }

    .th,
    .td {
      margin: 0;
      padding: 0.5rem;

      :last-child {
      }
    }
  }
`;
