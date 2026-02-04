import { IoSearch as SearchOutlined } from 'react-icons/io5';
import { Button, Input, InputRef, Select, Space } from 'antd';
import type { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { useCallback, useRef, useState } from 'react';

const { Option } = Select;

export const useFilterSearch = <T,>() => {
  type DataIndex = keyof T;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<string>('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = useCallback(
    (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex as string);
    },
    [],
  );

  const handleReset = useCallback((clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  }, []);

  const getColumnSearchProps = useCallback(
    (dataIndex: DataIndex, fields?: { label: String; value: String | Number }[]): ColumnType<T> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          {fields ? (
            <Select
              onChange={(value: string) => setSelectedKeys(value ? [value] : [])}
              value={selectedKeys[0] as any}
              className={'mb-2 block'}
              allowClear={true}
            >
              {fields?.map((s) => (
                <Option key={s.value as any} value={s.value}>
                  {s.label}
                </Option>
              ))}
            </Select>
          ) : (
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex as string}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
          )}

          <Space className={''}>
            <Button
              onClick={() => {
                confirm();
                clearFilters && handleReset(clearFilters);
                confirm({ closeDropdown: false });
                setSearchedColumn(dataIndex as string);
              }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      // onFilter: (value, record) =>
      //   record[dataIndex]
      //     .toString()
      //     .toLowerCase()
      //     .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      // render: (text) =>
      //   searchedColumn === dataIndex ? (
      //     <Highlighter
      //       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
      //       searchWords={[searchText]}
      //       autoEscape
      //       textToHighlight={text ? text.toString() : ''}
      //     />
      //   ) : (
      //     text
      //   ),
    }),
    [handleSearch, searchText, searchedColumn],
  );

  //

  return { getColumnSearchProps };
};
