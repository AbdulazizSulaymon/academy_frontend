import { useLocationParams } from '@hooks/use-location-params';

export const useTableFetchProps = () => {
  const {
    query: { pageSize, pageNumber, search, field, order },
  } = useLocationParams();

  return {
    take: pageSize,
    skip: ((pageNumber as unknown as number) - 1) * (pageSize as unknown as number),
    orderBy: { createdAt: 'desc' },
  };
};
