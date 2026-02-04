import dynamic from 'next/dynamic';
import { TableType } from '@components/table/table';

const Table = dynamic(() => import('./table'), {
  ssr: false,
});

export const DynamicTable = ({ ...props }: TableType) => {
  return <Table {...props} />;
};
