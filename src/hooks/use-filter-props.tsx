import { useLocationParams } from '@hooks/use-location-params';

export const useFilterProps = () => {
  const {
    query: { pageSize, pageNumber, search, field, order },
  } = useLocationParams();

  return {
    pageSize,
    pageNumber,
    searchTerm: (search?.slice(1) || '') + '',
    sorts: field ? [{ field, isDescending: order === 'descend' }] : undefined,
  };
};
