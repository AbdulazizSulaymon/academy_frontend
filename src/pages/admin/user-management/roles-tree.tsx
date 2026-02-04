import { NextPageWithLayout } from '@/types';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { Box } from '@components/box';
import { rolesQueryKey, useCreateRole, useDeleteRole, useRole, useRoles, useUpdateRole } from '@src/queries/models/role';
import { buildTree } from '@src/stores/layout-store';
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Divider,
  Drawer,
  Empty,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Space,
  Tag,
  Tree,
  Typography,
} from 'antd';
import type { DataNode } from 'antd/es/tree';
import { observer } from 'mobx-react';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GitBranch, Pencil, Plus, RefreshCcw, Search, Trash2, UnfoldVertical, FoldVertical, Shield, Users } from 'lucide-react';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { usePermissions } from '@src/queries/models/permission';

const { Text, Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

type RoleRecord = Record<string, any> & { children?: RoleRecord[] };
type PermissionRecord = { id: string; name: string; isHide?: boolean };

const CRUD_PERMISSION_REGEX = /(ReadSelf|CreateSelf|UpdateSelf|DeleteSelf|Create|Read|Update|Delete|Aggregation)/;

function toTreeData(roles: RoleRecord[], rolesById: Map<string, RoleRecord>): DataNode[] {
  return roles.map((role) => {
    const permissionCount = role?._count?.permission ?? role?.permission?.length ?? 0;
    const usersCount = role?._count?.users ?? role?._count?.User ?? role?.users?.length ?? 0;

    return {
      key: role.id,
      title: (
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white truncate">{role.name}</span>
              {role.parentId ? (
                <Tag color="geekblue" className="!m-0">
                  child
                </Tag>
              ) : (
                <Tag color="gold" className="!m-0">
                  root
                </Tag>
              )}
            </div>
            {role.parentId && rolesById.get(role.parentId)?.name ? (
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Parent: {rolesById.get(role.parentId)?.name}
              </div>
            ) : (
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">Parent: —</div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Tag className="!m-0" color="purple">
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3 h-3" />
                {permissionCount}
              </span>
            </Tag>
            <Tag className="!m-0" color="cyan">
              <span className="inline-flex items-center gap-1">
                <Users className="w-3 h-3" />
                {usersCount}
              </span>
            </Tag>
          </div>
        </div>
      ),
      children: role.children?.length ? toTreeData(role.children, rolesById) : undefined,
    } satisfies DataNode;
  });
}

function getAllKeys(nodes: DataNode[]): React.Key[] {
  const keys: React.Key[] = [];
  const walk = (n: DataNode[]) => {
    n.forEach((x) => {
      keys.push(x.key);
      if (x.children?.length) walk(x.children as DataNode[]);
    });
  };
  walk(nodes);
  return keys;
}

function filterTreeBySearch(nodes: RoleRecord[], search: string): RoleRecord[] {
  const q = search.trim().toLowerCase();
  if (!q) return nodes;

  const walk = (arr: RoleRecord[]): RoleRecord[] => {
    const out: RoleRecord[] = [];
    for (const node of arr) {
      const children = node.children?.length ? walk(node.children) : [];
      const selfMatch = String(node.name ?? '').toLowerCase().includes(q);
      if (selfMatch || children.length) {
        out.push({ ...node, children });
      }
    }
    return out;
  };

  return walk(nodes);
}

function toSafeIdentifier(input: string) {
  const raw = String(input || '').trim();
  if (!raw) return 'role';
  // keep letters/numbers, split on non-alphanum
  const parts = raw
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  if (!parts.length) return 'role';
  const camel =
    parts[0].toLowerCase() +
    parts
      .slice(1)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join('');
  return /^[a-zA-Z_$]/.test(camel) ? camel : `role_${camel}`;
}

function buildPermissionsTsExport(roleName: string, permissionNames: string[]) {
  const varName = `${toSafeIdentifier(roleName)}Permissions`;
  const uniqueSorted = Array.from(new Set(permissionNames.filter(Boolean))).sort((a, b) => a.localeCompare(b));
  const body = uniqueSorted.map((p) => `  ${p}: '${p}',`).join('\n');
  return {
    varName,
    filename: `${varName}.ts`,
    code: `export const ${varName} = {\n${body}\n} as const;\n`,
  };
}

async function copyToClipboard(text: string) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fallback below
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildChildrenMap(flatRoles: RoleRecord[]) {
  const map = new Map<string | null, string[]>();
  for (const r of flatRoles) {
    const p = (r.parentId ?? null) as string | null;
    if (!map.has(p)) map.set(p, []);
    map.get(p)!.push(r.id);
  }
  return map;
}

function getDescendants(childrenMap: Map<string | null, string[]>, roleId: string): Set<string> {
  const out = new Set<string>();
  const stack = [roleId];
  while (stack.length) {
    const current = stack.pop()!;
    const kids = childrenMap.get(current) || [];
    for (const k of kids) {
      if (!out.has(k)) {
        out.add(k);
        stack.push(k);
      }
    }
  }
  return out;
}

const Page: NextPageWithLayout = observer(() => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  const [form] = Form.useForm();
  const [permissionSearch, setPermissionSearch] = useState('');
  const [copiedPermissionIds, setCopiedPermissionIds] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const {
    rolesData,
    isLoadingRoles,
    isErrorRoles,
    refetch,
  } = useRoles(
    {
      orderBy: { name: 'asc' },
      include: {
        _count: { select: { permission: true, users: true } },
      },
    },
    { staleTime: 5000 },
  );

  const flatRoles: RoleRecord[] = useMemo(() => rolesData?.data?.data || [], [rolesData?.data?.data]);

  const rolesById = useMemo(() => {
    const map = new Map<string, RoleRecord>();
    flatRoles.forEach((r) => map.set(r.id, r));
    return map;
  }, [flatRoles]);

  const childrenMap = useMemo(() => buildChildrenMap(flatRoles), [flatRoles]);

  const roleTree: RoleRecord[] = useMemo(() => buildTree([...flatRoles], null), [flatRoles]);

  const filteredTree = useMemo(() => filterTreeBySearch(roleTree, search), [roleTree, search]);

  const treeData = useMemo(() => toTreeData(filteredTree, rolesById), [filteredTree, rolesById]);

  const selectedRole = useMemo(() => (selectedKey ? rolesById.get(selectedKey) : null), [rolesById, selectedKey]);

  const { roleData, isLoadingRole } = useRole(
    {
      where: { id: selectedKey },
      include: { permission: true, _count: { select: { permission: true, users: true } } },
    },
    { enabled: !!selectedKey },
  );

  const selectedRoleDetails = useMemo(() => (roleData?.data ? roleData.data : null), [roleData?.data]);

  const { permissionsData, isLoadingPermissions } = usePermissions({
    where: { isHide: { equals: false } },
    orderBy: { name: 'asc' },
  });

  const allPermissions: PermissionRecord[] = useMemo(() => permissionsData?.data?.data || [], [permissionsData?.data?.data]);

  const selectedPermissionIds = useMemo(() => {
    const ids = (selectedRoleDetails?.permission || []).map((p: any) => p.id);
    return new Set<string>(ids);
  }, [selectedRoleDetails?.permission]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('roles-tree-copied-permissions');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCopiedPermissionIds(parsed.filter((x) => typeof x === 'string'));
    } catch {
      // ignore
    }
  }, []);

  const permissionGroups = useMemo(() => {
    const q = permissionSearch.trim().toLowerCase();
    const groups: Record<
      string,
      { entity: string; permissions: { id: string; name: string; op: string; checked: boolean }[] }
    > = {};

    const getEntity = (permName: string) => permName.replace(CRUD_PERMISSION_REGEX, '') || permName;
    const getOp = (permName: string, entity: string) => {
      const prefix = permName.split(entity)[0] || '';
      return prefix.length === 0 ? 'not-crud' : prefix;
    };

    allPermissions.forEach((p) => {
      const entity = getEntity(p.name);
      const op = getOp(p.name, entity);
      const checked = selectedPermissionIds.has(p.id);

      if (q) {
        const hay = `${p.name} ${entity}`.toLowerCase();
        if (!hay.includes(q)) return;
      }

      if (!groups[entity]) groups[entity] = { entity, permissions: [] };
      groups[entity].permissions.push({ id: p.id, name: p.name, op, checked });
    });

    // Sort entities and permissions for stable UI
    const sorted = Object.values(groups)
      .map((g) => ({
        ...g,
        permissions: g.permissions.sort((a, b) => a.name.localeCompare(b.name)),
      }))
      .sort((a, b) => a.entity.localeCompare(b.entity));

    return sorted;
  }, [allPermissions, permissionSearch, selectedPermissionIds]);

  const visiblePermissionIds = useMemo(() => {
    const ids = permissionGroups.flatMap((g) => g.permissions.map((p) => p.id));
    return ids;
  }, [permissionGroups]);

  const { createRole, isLoadingCreateRole } = useCreateRole(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [rolesQueryKey] });
        message.success(t("Rol yaratildi") || 'Rol yaratildi');
        setDrawerOpen(false);
      },
      onError: () => message.error(t("Xatolik sodir bo'ldi") || "Xatolik sodir bo'ldi"),
    },
    { invalidateQueries: [rolesQueryKey] },
  );

  const { updateRole, isLoadingUpdateRole } = useUpdateRole(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [rolesQueryKey] });
        queryClient.invalidateQueries({ queryKey: ['role'] });
        message.success(t("Muvaffaqiyatli o'zgartirildi") || "Muvaffaqiyatli o'zgartirildi");
        setDrawerOpen(false);
      },
      onError: () => message.error(t("Xatolik sodir bo'ldi") || "Xatolik sodir bo'ldi"),
    },
    { invalidateQueries: [rolesQueryKey] },
  );

  const { deleteRole, isLoadingDeleteRole } = useDeleteRole(
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [rolesQueryKey] });
        queryClient.invalidateQueries({ queryKey: ['role'] });
        message.success(t("O'chirildi") || "O'chirildi");
        setSelectedKey(null);
      },
      onError: () => message.error(t("Xatolik sodir bo'ldi") || "Xatolik sodir bo'ldi"),
    },
    { invalidateQueries: [rolesQueryKey] },
  );

  useEffect(() => {
    if (drawerOpen && drawerMode === 'edit' && selectedRole) {
      form.setFieldsValue({
        name: selectedRole.name,
        parentId: selectedRole.parentId ?? undefined,
      });
    }
    if (drawerOpen && drawerMode === 'create') {
      form.resetFields();
      // Default parent = selected role (handy for adding children)
      form.setFieldsValue({ parentId: selectedRole?.id ?? undefined });
    }
  }, [drawerOpen, drawerMode, selectedRole?.id]);

  const onExpandAll = () => {
    const keys = getAllKeys(treeData);
    setExpandedKeys(keys);
    setAutoExpandParent(false);
  };

  const onCollapseAll = () => {
    setExpandedKeys([]);
    setAutoExpandParent(false);
  };

  const openCreate = () => {
    setDrawerMode('create');
    setDrawerOpen(true);
  };

  const openEdit = () => {
    if (!selectedRole) return;
    setDrawerMode('edit');
    setDrawerOpen(true);
  };

  const setAsRoot = () => {
    if (!selectedRole) return;
    updateRole({ data: { parentId: null }, where: { id: selectedRole.id } });
  };

  const updateRolePermissions = (connectIds: string[] = [], disconnectIds: string[] = []) => {
    if (!selectedRole) return;
    if (connectIds.length === 0 && disconnectIds.length === 0) return;
    updateRole({
      data: {
        permission: {
          connect: connectIds.map((id) => ({ id })),
          disconnect: disconnectIds.map((id) => ({ id })),
        },
      },
      where: { id: selectedRole.id },
    });
  };

  const togglePermission = (permissionId: string, nextChecked: boolean) => {
    if (nextChecked) updateRolePermissions([permissionId], []);
    else updateRolePermissions([], [permissionId]);
  };

  const toggleEntityAll = (entity: string, nextChecked: boolean) => {
    const group = permissionGroups.find((g) => g.entity === entity);
    if (!group) return;
    const ids = group.permissions.map((p) => p.id);
    if (nextChecked) {
      const connectIds = ids.filter((id) => !selectedPermissionIds.has(id));
      updateRolePermissions(connectIds, []);
    } else {
      const disconnectIds = ids.filter((id) => selectedPermissionIds.has(id));
      updateRolePermissions([], disconnectIds);
    }
  };

  const selectAllVisiblePermissions = () => {
    const connectIds = visiblePermissionIds.filter((id) => !selectedPermissionIds.has(id));
    updateRolePermissions(connectIds, []);
  };

  const clearAllVisiblePermissions = () => {
    const disconnectIds = visiblePermissionIds.filter((id) => selectedPermissionIds.has(id));
    updateRolePermissions([], disconnectIds);
  };

  const copyPermissionsFromSelectedRole = () => {
    if (!selectedRoleDetails) return;
    const ids = (selectedRoleDetails.permission || []).map((p: any) => p.id);
    setCopiedPermissionIds(ids);
    try {
      localStorage.setItem('roles-tree-copied-permissions', JSON.stringify(ids));
    } catch {
      // ignore
    }
    message.success(t('Permissionlar nusxalandi') || 'Permissionlar nusxalandi');
  };

  const pastePermissionsToSelectedRole = () => {
    if (!selectedRole) return;
    if (!copiedPermissionIds.length) {
      message.info(t('Nusxa qilingan permission yo‘q') || "Nusxa qilingan permission yo‘q");
      return;
    }
    const copied = new Set(copiedPermissionIds);
    const allIds = allPermissions.map((p) => p.id);

    const connectIds = allIds.filter((id) => copied.has(id) && !selectedPermissionIds.has(id));
    const disconnectIds = allIds.filter((id) => !copied.has(id) && selectedPermissionIds.has(id));

    updateRolePermissions(connectIds, disconnectIds);
  };

  const pastePermissionsMergeToSelectedRole = () => {
    if (!selectedRole) return;
    if (!copiedPermissionIds.length) {
      message.info(t('Nusxa qilingan permission yo‘q') || "Nusxa qilingan permission yo‘q");
      return;
    }
    const copied = new Set(copiedPermissionIds);
    const connectIds = allPermissions.map((p) => p.id).filter((id) => copied.has(id) && !selectedPermissionIds.has(id));
    updateRolePermissions(connectIds, []);
  };

  const copySelectedRolePermissionsAsTs = async () => {
    if (!selectedRoleDetails) return;
    setIsExporting(true);
    try {
      const permissionNames = (selectedRoleDetails.permission || []).map((p: any) => p.name);
      const exp = buildPermissionsTsExport(selectedRoleDetails.name, permissionNames);
      const ok = await copyToClipboard(exp.code);
      if (ok) message.success(t('Buferga nusxalandi') || 'Buferga nusxalandi');
      else message.error(t('Copy ishlamadi') || 'Copy ishlamadi');
    } finally {
      setIsExporting(false);
    }
  };

  const downloadSelectedRolePermissionsAsTs = async () => {
    if (!selectedRoleDetails) return;
    setIsExporting(true);
    try {
      const permissionNames = (selectedRoleDetails.permission || []).map((p: any) => p.name);
      const exp = buildPermissionsTsExport(selectedRoleDetails.name, permissionNames);
      downloadTextFile(exp.filename, exp.code);
      message.success(t('Yuklab olindi') || 'Yuklab olindi');
    } finally {
      setIsExporting(false);
    }
  };

  const onSubmitDrawer = async (values: any) => {
    const payload = {
      name: values.name?.trim(),
      parentId: values.parentId || null,
    };
    if (!payload.name) return;

    if (drawerMode === 'create') {
      createRole({ data: payload });
      return;
    }
    if (drawerMode === 'edit' && selectedRole) {
      // prevent self-parent
      if (payload.parentId === selectedRole.id) {
        message.error(t("Rol o'zini ota rol qila olmaydi") || "Rol o'zini ota rol qila olmaydi");
        return;
      }
      // prevent cycles
      if (payload.parentId) {
        const descendants = getDescendants(childrenMap, selectedRole.id);
        if (descendants.has(payload.parentId)) {
          message.error(t("Xatolik: sikl hosil bo'ladi") || "Xatolik: sikl hosil bo'ladi");
          return;
        }
      }
      updateRole({ data: payload, where: { id: selectedRole.id } });
    }
  };

  return (
    <Box>
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-600 to-primary-700 p-6 mb-6">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium w-fit">
            <GitBranch className="w-4 h-4" />
            <span>{t('Roles Tree') || 'Roles Tree'}</span>
          </div>
          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-white">{t('Rollar tuzilmasi') || 'Rollar tuzilmasi'}</h1>
          <p className="mt-2 text-white/80 max-w-2xl">
            {t("Rollarni ota-bola ko'rinishida ko'ring. Qidiruv, expand/collapse va rol tafsilotlari mavjud.") ||
              "Rollarni ota-bola ko'rinishida ko'ring. Qidiruv, expand/collapse va rol tafsilotlari mavjud."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <Card
            className={clsx('rounded-2xl', 'border border-gray-100 dark:border-gray-800')}
            bodyStyle={{ padding: 16 }}
            title={<span className="font-semibold">{t('Rollar daraxti') || 'Rollar daraxti'}</span>}
            extra={
              <Space>
                <Button icon={<Plus className="w-4 h-4" />} type="primary" onClick={openCreate}>
                  {t("Yangi rol") || 'Yangi rol'}
                </Button>
                <Button icon={<RefreshCcw className="w-4 h-4" />} onClick={() => refetch()} loading={isLoadingRoles}>
                  {t('Yangilash') || 'Yangilash'}
                </Button>
              </Space>
            }
          >
            <div className="flex flex-col gap-3">
              <Input
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                prefix={<Search className="w-4 h-4 text-gray-400" />}
                placeholder={t('Rol nomi bo‘yicha qidirish') || 'Rol nomi bo‘yicha qidirish'}
              />

              <div className="flex flex-wrap gap-2">
                <Button icon={<UnfoldVertical className="w-4 h-4" />} onClick={onExpandAll} disabled={!treeData.length}>
                  {t('Hammasini ochish') || 'Hammasini ochish'}
                </Button>
                <Button icon={<FoldVertical className="w-4 h-4" />} onClick={onCollapseAll} disabled={!treeData.length}>
                  {t('Yopish') || 'Yopish'}
                </Button>
              </div>

              <Divider className="!my-2" />

              {isErrorRoles && <Empty description={t('Xatolik') || 'Xatolik'} />}

              {!isErrorRoles && !treeData.length && !isLoadingRoles && (
                <Empty description={t('Rollar topilmadi') || 'Rollar topilmadi'} />
              )}

              <div className="max-h-[70vh] overflow-auto pr-1">
                <Tree
                  showLine
                  blockNode
                  draggable
                  selectedKeys={selectedKey ? [selectedKey] : []}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onExpand={(keys) => {
                    setExpandedKeys(keys);
                    setAutoExpandParent(false);
                  }}
                  onSelect={(keys) => {
                    const key = keys?.[0]?.toString();
                    setSelectedKey(key || null);
                  }}
                  onDrop={(info) => {
                    const dragKey = info.dragNode.key?.toString();
                    const dropKey = info.node.key?.toString();
                    if (!dragKey || !dropKey) return;

                    // We only support dropping ON a node (set parent). Gap drop is ambiguous.
                    if (info.dropToGap) {
                      message.info(t("Iltimos, rolni boshqa rol ustiga tashlang (gapga emas).") || 'Iltimos, rolni boshqa rol ustiga tashlang (gapga emas).');
                      return;
                    }

                    if (dragKey === dropKey) return;

                    const descendants = getDescendants(childrenMap, dragKey);
                    if (descendants.has(dropKey)) {
                      message.error(t("Xatolik: sikl hosil bo'ladi") || "Xatolik: sikl hosil bo'ladi");
                      return;
                    }

                    updateRole({ data: { parentId: dropKey }, where: { id: dragKey } });
                    // Ensure target branch is expanded so user sees result
                    setExpandedKeys((prev) => Array.from(new Set([...prev, dropKey])));
                    setAutoExpandParent(false);
                  }}
                  treeData={treeData}
                  height={520}
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-2">
          <Card
            className={clsx('rounded-2xl', 'border border-gray-100 dark:border-gray-800')}
            bodyStyle={{ padding: 16 }}
            title={<span className="font-semibold">{t('Rol tafsilotlari') || 'Rol tafsilotlari'}</span>}
          >
            {!selectedRole ? (
              <Empty description={t('Chapdan rol tanlang') || 'Chapdan rol tanlang'} />
            ) : (
              <div className="space-y-3">
                <div>
                  <Title level={4} className="!m-0 !text-gray-900 dark:!text-white">
                    {selectedRole.name}
                  </Title>
                  <Text type="secondary">
                    {t('Parent') || 'Parent'}:{' '}
                    <span className="text-gray-700 dark:text-gray-300">
                      {selectedRole.parentId ? rolesById.get(selectedRole.parentId)?.name || '—' : '—'}
                    </span>
                  </Text>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Tag color="purple">
                    <span className="inline-flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {t('Ruxsatlar') || 'Ruxsatlar'}: {selectedRoleDetails?._count?.permission ?? selectedRole?._count?.permission ?? 0}
                    </span>
                  </Tag>
                  <Tag color="cyan">
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {t('Foydalanuvchilar') || 'Foydalanuvchilar'}: {selectedRoleDetails?._count?.users ?? selectedRole?._count?.users ?? 0}
                    </span>
                  </Tag>
                </div>

                <Divider className="!my-2" />

                <div className="flex gap-2">
                  <Button icon={<Pencil className="w-4 h-4" />} onClick={openEdit} disabled={!selectedRole}>
                    {t('Tahrirlash') || 'Tahrirlash'}
                  </Button>
                  <Button onClick={setAsRoot} disabled={!selectedRole || !selectedRole.parentId} loading={isLoadingUpdateRole}>
                    {t('Root qilish') || 'Root qilish'}
                  </Button>
                  <Popconfirm
                    title={t("O'chirishni tasdiqlaysizmi?") || "O'chirishni tasdiqlaysizmi?"}
                    okText={t("Ha") || 'Ha'}
                    cancelText={t("Bekor") || 'Bekor'}
                    onConfirm={() => selectedRole && deleteRole({ id: selectedRole.id })}
                  >
                    <Button danger icon={<Trash2 className="w-4 h-4" />} loading={isLoadingDeleteRole}>
                      {t("O'chirish") || "O'chirish"}
                    </Button>
                  </Popconfirm>
                </div>

                <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-3">
                  <div className="font-semibold mb-2">{t('Permissionlar') || 'Permissionlar'}</div>

                  <Input
                    allowClear
                    value={permissionSearch}
                    onChange={(e) => setPermissionSearch(e.target.value)}
                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                    placeholder={t('Permission bo‘yicha qidirish') || 'Permission bo‘yicha qidirish'}
                    className="mb-2"
                  />

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Button
                      onClick={selectAllVisiblePermissions}
                      disabled={!selectedRole || visiblePermissionIds.length === 0}
                      loading={isLoadingUpdateRole}
                    >
                      {t('Hammasini belgilash') || 'Hammasini belgilash'}
                    </Button>
                    <Popconfirm
                      title={t("Ko'rinib turgan permissionlarni hammasini olib tashlaysizmi?") || "Ko'rinib turgan permissionlarni hammasini olib tashlaysizmi?"}
                      okText={t('Ha') || 'Ha'}
                      cancelText={t('Bekor') || 'Bekor'}
                      onConfirm={clearAllVisiblePermissions}
                    >
                      <Button disabled={!selectedRole || visiblePermissionIds.length === 0} loading={isLoadingUpdateRole}>
                        {t('Hammasini olib tashlash') || 'Hammasini olib tashlash'}
                      </Button>
                    </Popconfirm>

                    <Divider type="vertical" className="!h-8 !mx-1" />

                    <Button onClick={copyPermissionsFromSelectedRole} disabled={!selectedRoleDetails}>
                      {t('Copy') || 'Copy'}
                    </Button>

                    <Popconfirm
                      title={
                        t("Nusxa qilingan permissionlarni ushbu rolga qo'llaysizmi?") ||
                        "Nusxa qilingan permissionlarni ushbu rolga qo'llaysizmi?"
                      }
                      description={
                        copiedPermissionIds.length
                          ? `${t('Nusxa') || 'Nusxa'}: ${copiedPermissionIds.length}`
                          : undefined
                      }
                      okText={t('Ha') || 'Ha'}
                      cancelText={t('Bekor') || 'Bekor'}
                      onConfirm={pastePermissionsToSelectedRole}
                    >
                      <Button
                        type="primary"
                        disabled={!selectedRole || copiedPermissionIds.length === 0}
                        loading={isLoadingUpdateRole}
                      >
                        {t('Paste') || 'Paste'} {copiedPermissionIds.length ? `(${copiedPermissionIds.length})` : ''}
                      </Button>
                    </Popconfirm>

                    <Popconfirm
                      title={
                        t("Merge: nusxa qilingan permissionlarni qo'shasizmi? (mavjudlarini o'chirmaydi)") ||
                        "Merge: nusxa qilingan permissionlarni qo'shasizmi? (mavjudlarini o'chirmaydi)"
                      }
                      okText={t('Ha') || 'Ha'}
                      cancelText={t('Bekor') || 'Bekor'}
                      onConfirm={pastePermissionsMergeToSelectedRole}
                    >
                      <Button
                        disabled={!selectedRole || copiedPermissionIds.length === 0}
                        loading={isLoadingUpdateRole}
                      >
                        {t('Paste merge') || 'Paste merge'}
                      </Button>
                    </Popconfirm>

                    <Divider type="vertical" className="!h-8 !mx-1" />

                    <Button onClick={copySelectedRolePermissionsAsTs} disabled={!selectedRoleDetails} loading={isExporting}>
                      {t('Copy .ts') || 'Copy .ts'}
                    </Button>
                    <Button
                      onClick={downloadSelectedRolePermissionsAsTs}
                      disabled={!selectedRoleDetails}
                      loading={isExporting}
                    >
                      {t('Download .ts') || 'Download .ts'}
                    </Button>
                  </div>

                  {(isLoadingRole || isLoadingPermissions) && (
                    <Text type="secondary">{t('Yuklanmoqda...') || 'Yuklanmoqda...'}</Text>
                  )}

                  {!isLoadingRole && !isLoadingPermissions && permissionGroups.length === 0 && (
                    <Text type="secondary">{t('Permission topilmadi') || 'Permission topilmadi'}</Text>
                  )}

                  {!isLoadingRole && !isLoadingPermissions && permissionGroups.length > 0 && (
                    <Collapse
                      bordered={false}
                      className="bg-transparent"
                      items={permissionGroups.map((g) => {
                        const total = g.permissions.length;
                        const checkedCount = g.permissions.filter((p) => selectedPermissionIds.has(p.id)).length;
                        const allChecked = total > 0 && checkedCount === total;
                        const indeterminate = checkedCount > 0 && checkedCount < total;

                        return {
                          key: g.entity,
                          label: (
                            <div className="flex items-center justify-between gap-2">
                              <div className="min-w-0">
                                <div className="font-semibold truncate">
                                  {t(`Permission.${g.entity}`) || g.entity}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {checkedCount}/{total} {t('tanlangan') || 'tanlangan'}
                                </div>
                              </div>
                              <Checkbox
                                checked={allChecked}
                                indeterminate={indeterminate}
                                onChange={(e) => toggleEntityAll(g.entity, e.target.checked)}
                              />
                            </div>
                          ),
                          children: (
                            <div className="space-y-2">
                              {g.permissions.map((p) => (
                                <div key={p.id} className="flex items-center justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="text-sm font-medium truncate">{p.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                      {p.op}
                                    </div>
                                  </div>
                                  <Checkbox
                                    checked={selectedPermissionIds.has(p.id)}
                                    onChange={(e) => togglePermission(p.id, e.target.checked)}
                                  />
                                </div>
                              ))}
                            </div>
                          ),
                        };
                      })}
                    />
                  )}
                </div>

                <div>
                  <Text strong>{t('ID') || 'ID'}:</Text>
                  <div className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-400 break-all">{selectedRole.id}</div>
                </div>

                <Button block onClick={() => window.open('/admin/user-management/roles', '_self')}>
                  {t('Role boshqaruv sahifasi') || 'Role boshqaruv sahifasi'}
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Drawer
        title={
          drawerMode === 'create'
            ? t("Yangi rol qo'shish") || "Yangi rol qo'shish"
            : t("Rolni tahrirlash") || "Rolni tahrirlash"
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
        extra={
          <Space>
            <Button onClick={() => setDrawerOpen(false)}>{t('Bekor') || 'Bekor'}</Button>
            <Button
              type="primary"
              loading={drawerMode === 'create' ? isLoadingCreateRole : isLoadingUpdateRole}
              onClick={() => form.submit()}
            >
              {t('Saqlash') || 'Saqlash'}
            </Button>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={onSubmitDrawer}>
          <Form.Item
            name="name"
            label={t('Role nomi') || 'Role nomi'}
            rules={[{ required: true, message: t('Iltimos role nomini kiriting') || 'Iltimos role nomini kiriting' }]}
          >
            <Input placeholder="Admin, Seller, Manager..." />
          </Form.Item>
          <Form.Item name="parentId" label={t('Ota rol') || 'Ota rol'}>
            <Select allowClear placeholder={t('Ota rolni tanlang') || 'Ota rolni tanlang'}>
              {flatRoles
                .filter((r) => (drawerMode === 'edit' && selectedRole ? r.id !== selectedRole.id : true))
                .map((r) => (
                  <Option key={r.id} value={r.id}>
                    {r.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t("Tip: Tree'da rolni drag&drop qilib ham ota rolini o'zgartira olasiz.") ||
              "Tip: Tree'da rolni drag&drop qilib ham ota rolini o'zgartira olasiz."}
          </div>
        </Form>
      </Drawer>
    </Box>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Roles Tree">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;

