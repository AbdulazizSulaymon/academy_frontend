import { useLayoutStore } from '@src/stores/layout-store';
import { useExistPartner } from '@src/queries/models/partner';
import { useUserMe } from '@hooks/use-user-me';
import { useMemo } from 'react';

export const useCheckRoles = () => {
  useUserMe();
  const { roles, user } = useLayoutStore();

  const { existPartner } = useExistPartner({ where: { userId: user?.id } }, { enabled: !!user?.id });

  const isAdmin = useMemo(() => !!roles?.admin, [roles?.admin]);
  const isPartner = useMemo(() => !!existPartner, [existPartner]);
  const accessRoles = useMemo(
    () => ['seller', isAdmin && 'admin', isPartner && 'partner'].filter(Boolean) as string[],
    [existPartner],
  );

  return { accessRoles, isAdmin, isPartner };
};
