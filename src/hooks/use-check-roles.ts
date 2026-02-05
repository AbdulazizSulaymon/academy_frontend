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

  // Check if user has specific roles
  const isStudent = useMemo(() => {
    return user?.roles?.some((r: any) => r.name === 'Student') || false;
  }, [user?.roles]);

  const isMentor = useMemo(() => {
    return user?.roles?.some((r: any) => r.name === 'Mentor') || false;
  }, [user?.roles]);

  const isSuperAdmin = useMemo(() => {
    return user?.roles?.some((r: any) => r.name === 'Super Admin') || false;
  }, [user?.roles]);

  const isSalesManager = useMemo(() => {
    return user?.roles?.some((r: any) => r.name === 'Sales Manager') || false;
  }, [user?.roles]);

  const accessRoles = useMemo(
    () => [
      'seller',
      isAdmin && 'admin',
      isPartner && 'partner',
      isStudent && 'student',
      isMentor && 'mentor',
      isSuperAdmin && 'superadmin',
      isSalesManager && 'sales'
    ].filter(Boolean) as string[],
    [isAdmin, isPartner, isStudent, isMentor, isSuperAdmin, isSalesManager],
  );

  return {
    accessRoles,
    isAdmin,
    isPartner,
    isStudent,
    isMentor,
    isSuperAdmin,
    isSalesManager
  };
};
