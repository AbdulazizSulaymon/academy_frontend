import { useApi } from '@src/api';
import { Box } from '@components/box';
import { SpinLoading } from '@components/loading';
import { MyDrawer } from '@components/my-drawer';
import Table from '@components/table/table';
import { css } from '@emotion/react';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';
import { useUserMe } from '@hooks/use-user-me';
import { usePermissions } from '@src/queries/models/permission';
import { rolesQueryKey, useDeleteRole, useRoles, useUpdateRole } from '@src/queries/models/role';
import { useUsers } from '@src/queries/models/user';
import { buildTree, useLayoutStore } from '@src/stores/layout-store';
import { getDeleteSecondaryOptions } from '@utils/util';
import type { TableProps } from 'antd';
import { Table as AntTable, Button, Checkbox, Form, Input, Select } from 'antd';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DynamicProviders } from '@hocs/dynamic-providers';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { NextPageWithLayout } from '@/types';

const { Option } = Select;

type TableRowSelection<T> = TableProps<T>['rowSelection'];

export const PermissionsOrder = [
  'Role',
  'Permission',
  'Department',
  'Notification',
  'ViewNotification',
  'Shop',
  'User',
  'Client',
  'Chat',
  'Task',
  'DefaultTask',
];

const Page: NextPageWithLayout = observer(() => {
  const { push, query } = useLocationParams();
  const { t } = useTranslation();
  const { permissions } = useLayoutStore();
  const { rolesData, isLoadingRoles } = useRoles({
    orderBy: { name: 'asc' },
    include: { _count: { select: { permission: true } } },
  });
  const { permissionsData, isLoadingPermissions } = usePermissions({
    where: {
      isHide: {
        equals: false,
      },
    },
    orderBy: { name: 'asc' },
  });
  const { updatedRole } = useUpdateRole({});

  const handlePermissionChange = useCallback(
    (roleId: string, permissionId: string, checked: boolean) => {
      const updatedRole = rolesData?.data?.find((role: any) => role.id === roleId);
      if (updatedRole) {
        const updatedPermissions = checked
          ? [...updatedRole.permissions.map((p: any) => p.id), permissionId]
          : updatedRole.permissions.map((p: any) => p.id).filter((id: any) => id !== permissionId);
        updatedRole({ id: roleId, permissions: updatedPermissions });
      }
    },
    [rolesData, updatedRole],
  );

  const { deleteRoleFromTable } = useDeleteRole({}, getDeleteSecondaryOptions([rolesQueryKey]));
  const addCallback = useCallback(() => push({ query: { add: true } }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ query: { edit: true, id: data.id } }, { update: true }),
    [push],
  );

  const columns = useMemo(
    () => [
      {
        title: t('Rol'),
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: t('Ruxsatlar'),
        dataIndex: '_count',
        key: '_count',
        render: (value: any, record: Record<string, any>) => value.permission,
        width: 130,
      },
      {
        title: t('Ota role'),
        dataIndex: 'parentId',
        key: 'parentId',
        render: (value: string, record: Record<string, any>) =>
          rolesData?.data?.data?.find((item: Record<string, any>) => item.id === value)?.name,
        width: 130,
      },
    ],
    [permissionsData, handlePermissionChange],
  );

  return (
    <Box>
      <ItemDrawer />
      {query.tree && <TreeDrawer />}
      <Table
        queryKey={[rolesQueryKey]}
        name={'roles'}
        dataSource={rolesData?.data?.data || []}
        columns={columns}
        hidePagination={true}
        total={rolesData?.data?.totalCount}
        loading={isLoadingRoles || isLoadingPermissions}
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={deleteRoleFromTable}
        isAddDisable={!permissions['CreateRole']}
        isEditDisable={!permissions['UpdateRole']}
        isDeleteDisable={!permissions['DeleteRole']}
      />
    </Box>
  );
});

const ItemDrawer = observer(() => {
  const { push, query } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const { t } = useTranslation();
  const [permissions, setPermissions] = React.useState<any[]>([]);
  const [selectedPermissions, setSelectedPermissions] = React.useState<any[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const CRUD_OPERATIONS = [
    'Aggregation',
    'ReadSelf',
    'Read',
    'CreateSelf',
    'Create',
    'UpdateSelf',
    'Update',
    'DeleteSelf',
    'Delete',
  ];
  const { refetchMe } = useUserMe();
  const { rolesData } = useRoles({ orderBy: { name: 'asc' } });

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: rolesQueryKey,
    model: api.apis.Role,
    getOne: () => api.apis.Role.findOne({ where: { id: query.id }, include: { permission: true } }),
    onSuccess: () => {
      refetchMe();
    },
  });
  const [countTypePermissionsChecked, setCountTypePermissionsChecked] = useState<number>(0);

  const { permissionsData } = usePermissions({
    where: {
      isHide: {
        equals: false,
      },
    },
    orderBy: { name: 'asc' },
  });

  const onCancel = () => {
    form.resetFields();
    push({ query: { edit: undefined, add: undefined, id: undefined } }, { update: true });
  };

  const onFinish = async (values: any) => {
    const formatedConnectPermissions = generatePermissionArray(selectedPermissions).filter(
      (p: any) => !dataById?.data?.permission?.find((dp: any) => dp.name === p),
    );
    const formatedDisconnectPermissions = dataById?.data?.permission.filter(
      (dp: any) => !generatePermissionArray(selectedPermissions).includes(dp.name),
    );

    if (query.add) {
      post({
        data: {
          ...values,
          permission: {
            connect: permissionsData?.data?.data
              .filter((item: any) => formatedConnectPermissions?.includes(item.name))
              .map((p: any) => ({ id: p.id })),
            disconnect: formatedDisconnectPermissions?.map((p: any) => ({ id: p.id })),
          },
        },
      });
    } else if (query.edit) {
      update({
        data: {
          ...values,
          permission: {
            connect: permissionsData?.data?.data
              .filter((item: any) => formatedConnectPermissions?.includes(item.name))
              .map((p: any) => ({ id: p.id })),
            disconnect: formatedDisconnectPermissions?.map((p: any) => ({ id: p.id })),
          },
        },
        where: {
          id: dataById?.data.id,
        },
      });
    }

    onCancel();
  };

  const generatePermissionArray = (permissions: any) => {
    return permissions.flatMap((permission: any) =>
      Object.keys(permission)
        .filter((key) => key !== 'entity' && permission[key])
        .map((key) => `${key !== 'not-crud' ? key : ''}${permission.entity}`),
    );
  };

  useEffect(() => {
    if (query.edit && dataById?.data) form.setFieldsValue(dataById?.data);
  }, [dataById?.data]);

  const handleCheckboxChange = (role: string, permission: string, checked: boolean) => {
    setSelectedPermissions((prevPermissions) => {
      const newPermissions = [...prevPermissions];
      const permissionIndex = newPermissions.findIndex((item) => {
        return item.entity === role;
      });

      if (permissionIndex !== -1) {
        newPermissions[permissionIndex] = {
          ...newPermissions[permissionIndex],
          [permission]: checked,
        };
      } else {
        newPermissions.push({ entity: role, [permission]: checked });
      }

      if (permission === 'not-crud' && checked) {
        setSelectedRowKeys((prev) => [...prev, role]);
      }

      if (
        checked &&
        !Object.entries(permissions.find((p) => p.entity === role)).some(
          ([key, value]) => !newPermissions[permissionIndex]?.[key],
        ) &&
        permissionIndex !== -1
      ) {
        setSelectedRowKeys((prev) => [...prev, role]);
      }

      return newPermissions;
    });

    if (!checked) {
      setSelectedRowKeys((prev) => prev.filter((key) => key !== role));
    }
  };

  const handleSelectPermission = (permissionKey: string, isChecked: boolean) => {
    setSelectedPermissions((prevState) =>
      permissions.map((p) => {
        const existingPermission = prevState.find((item) => item.entity === p.entity) || {};
        if (p[permissionKey] !== undefined) {
          return { ...existingPermission, entity: p.entity, [permissionKey]: isChecked };
        }
        return existingPermission || p;
      }),
    );

    setSelectedRowKeys((prevState) => {
      const entitiesWithPermission = permissions.filter((p) => p[permissionKey] !== undefined).map((p) => p.entity);

      if (isChecked) {
        let count = countTypePermissionsChecked;
        count++;
        if (count === CRUD_OPERATIONS.length) {
          const newEntities = entitiesWithPermission.filter((entity) => !prevState.includes(entity));
          return [...prevState, ...newEntities];
        } else {
          setCountTypePermissionsChecked((prevState) => prevState + 1);
          return [...prevState];
        }
      } else {
        setCountTypePermissionsChecked((prevState) => prevState - 1);
        return prevState.filter((key) => !entitiesWithPermission.includes(key));
      }
    });
  };

  useEffect(() => {
    let count = 0;
    if (
      selectedPermissions.filter((item) => item?.Aggregation).length ===
      permissions.filter((item) => item?.Aggregation).length
    ) {
      count++;
    }
    if (
      selectedPermissions.filter((item) => item?.CreateSelf).length ===
      permissions.filter((item) => item?.CreateSelf).length
    ) {
      count++;
    }
    if (
      selectedPermissions.filter((item) => item?.Create).length === permissions.filter((item) => item?.Create).length
    ) {
      count++;
    }
    if (
      selectedPermissions.filter((item) => item?.ReadSelf).length ===
      permissions.filter((item) => item?.ReadSelf).length
    ) {
      count++;
    }
    if (selectedPermissions.filter((item) => item?.Read).length === permissions.filter((item) => item?.Read).length) {
      count++;
    }
    if (
      selectedPermissions.filter((item) => item?.UpdateSelf).length ===
      permissions.filter((item) => item?.UpdateSelf).length
    ) {
      count++;
    }
    if (
      selectedPermissions.filter((item) => item?.Update).length === permissions.filter((item) => item?.Update).length
    ) {
      count++;
    }
    if (
      selectedPermissions.filter((item) => item?.DeleteSelf).length ===
      permissions.filter((item) => item?.DeleteSelf).length
    ) {
      count++;
    }
    if (
      selectedPermissions.filter((item) => item?.Delete).length === permissions.filter((item) => item?.Delete).length
    ) {
      count++;
    }

    setCountTypePermissionsChecked(count);
  }, [selectedPermissions]);

  const columns: any = useMemo(
    () => [
      {
        title: '',
        dataIndex: 'entity',
        key: 'entity',
        render: (value: any) => t(`Permission.${value}`),
        fixed: 'left',
        width: 200,
      },
      {
        title: '',
        dataIndex: 'not-crud',
        key: 'self',
        render: (value: any, record: any) =>
          record['not-crud'] ? (
            <div className={'flex'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.['not-crud']}
                onChange={(e) => handleCheckboxChange(record.entity, 'not-crud', e.target.checked)}
                disabled={!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t("Sonini ko'rsatish")}
            <Checkbox
              onChange={(e) => handleSelectPermission('Aggregation', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.Aggregation).length ===
                permissions.filter((item) => item?.Aggregation).length
              }
            />
          </div>
        ),
        dataIndex: 'Aggregation',
        key: 'aggregation',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.Aggregation}
                onChange={(e) => handleCheckboxChange(record.entity, 'Aggregation', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t('Shaxsiy yaratish')}
            <Checkbox
              onChange={(e) => handleSelectPermission('CreateSelf', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.CreateSelf).length ===
                permissions.filter((item) => item?.CreateSelf).length
              }
            />
          </div>
        ),
        dataIndex: 'CreateSelf',
        key: 'CreateSelf',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.CreateSelf}
                onChange={(e) => handleCheckboxChange(record.entity, 'CreateSelf', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t('Hammaga yaratish')}
            <Checkbox
              onChange={(e) => handleSelectPermission('Create', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.Create).length ===
                permissions.filter((item) => item?.Create).length
              }
            />
          </div>
        ),
        dataIndex: 'Create',
        key: 'create',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.Create}
                onChange={(e) => handleCheckboxChange(record.entity, 'Create', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t("Shaxsiy o'qish")}
            <Checkbox
              onChange={(e) => handleSelectPermission('ReadSelf', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.ReadSelf).length ===
                permissions.filter((item) => item?.ReadSelf).length
              }
            />
          </div>
        ),
        dataIndex: 'ReadSelf',
        key: 'readSelf',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.ReadSelf}
                onChange={(e) => handleCheckboxChange(record.entity, 'ReadSelf', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t("Hammasini o'qish")}
            <Checkbox
              onChange={(e) => handleSelectPermission('Read', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.Read).length ===
                permissions.filter((item) => item?.Read).length
              }
            />
          </div>
        ),
        dataIndex: 'Read',
        key: 'read',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.Read}
                onChange={(e) => handleCheckboxChange(record.entity, 'Read', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t('Shaxsiy tahrirlash')}
            <Checkbox
              onChange={(e) => handleSelectPermission('UpdateSelf', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.UpdateSelf).length ===
                permissions.filter((item) => item?.UpdateSelf).length
              }
            />
          </div>
        ),
        dataIndex: 'UpdateSelf',
        key: 'UpdateSelf',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.UpdateSelf}
                onChange={(e) => handleCheckboxChange(record.entity, 'UpdateSelf', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t('Hammasini tahrirlash')}
            <Checkbox
              onChange={(e) => handleSelectPermission('Update', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.Update).length ===
                permissions.filter((item) => item?.Update).length
              }
            />
          </div>
        ),
        dataIndex: 'Update',
        key: 'update',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.Update}
                onChange={(e) => handleCheckboxChange(record.entity, 'Update', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t("Shaxsiy o'chirish")}
            <Checkbox
              onChange={(e) => handleSelectPermission('DeleteSelf', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.DeleteSelf).length ===
                permissions.filter((item) => item?.DeleteSelf).length
              }
            />
          </div>
        ),
        dataIndex: 'DeleteSelf',
        key: 'DeleteSelf',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.DeleteSelf}
                onChange={(e) => handleCheckboxChange(record.entity, 'DeleteSelf', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
      {
        title: (
          <div className={'flex flex-col items-center gap-2'}>
            {t("Hammanikini o'chirish")}
            <Checkbox
              onChange={(e) => handleSelectPermission('Delete', e.target.checked)}
              checked={
                selectedPermissions.filter((item) => item?.Delete).length ===
                permissions.filter((item) => item?.Delete).length
              }
            />
          </div>
        ),
        dataIndex: 'Delete',
        key: 'delete',
        render: (value: any, record: any) =>
          !record['not-crud'] && value !== undefined ? (
            <div className={'flex justify-center'}>
              <Checkbox
                checked={!!selectedPermissions.find((item) => item.entity === record.entity)?.Delete}
                onChange={(e) => handleCheckboxChange(record.entity, 'Delete', e.target.checked)}
                disabled={!!record['not-crud']}
              />
            </div>
          ) : null,
      },
    ],
    [selectedPermissions, t],
  );

  useMemo(() => {
    const permissionMap: Record<string, any> = {};
    const userPermissionMap: Record<string, any> = {};

    permissionsData?.data?.data?.forEach((perm: any) => {
      const entity = perm.name.replace(
        /(ReadSelf|CreateSelf|UpdateSelf|DeleteSelf|Create|Read|Update|Delete|Aggregation)/,
        '',
      );
      if (!permissionMap[entity]) {
        permissionMap[entity] = {};
      }
      permissionMap[entity][perm.name.split(entity)[0].length === 0 ? 'not-crud' : perm.name.split(entity)[0]] = true;
    });

    dataById?.data?.permission?.forEach((perm: any) => {
      const entity = perm.name.replace(
        /(ReadSelf|CreateSelf|UpdateSelf|DeleteSelf|Create|Read|Update|Delete|Aggregation)/,
        '',
      );
      if (!userPermissionMap[entity]) {
        userPermissionMap[entity] = {};
      }
      userPermissionMap[entity][perm.name.split(entity)[0].length === 0 ? 'not-crud' : perm.name.split(entity)[0]] =
        true;
    });

    setPermissions(
      Object.entries(permissionMap).map(([entity, perms]) => ({
        entity,
        ...perms,
      })),
    );

    setSelectedPermissions(
      Object.entries(userPermissionMap).map(([entity, perms]) => ({
        entity,
        ...perms,
      })),
    );

    setSelectedRowKeys(mapPermissionsToEntities(Object.entries(userPermissionMap), permissionsData?.data?.data));
  }, [dataById?.data?.permission, permissionsData]);

  function mapPermissionsToEntities(permissionsArray: any[], actualPermissions: any[]): string[] {
    return permissionsArray
      .filter(
        ([entity, perms]) =>
          perms['not-crud'] ||
          CRUD_OPERATIONS.every(
            (operation) => perms[operation] || !actualPermissions?.some((p) => p.name === `${operation}${entity}`),
          ),
      )
      .map(([entity]) => entity);
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    if (newSelectedRowKeys.length > selectedRowKeys.length) {
      newSelectedRowKeys
        .filter((key) => !selectedRowKeys.includes(key))
        .forEach((key) => {
          setSelectedPermissions((prevValue) => {
            if (prevValue.find((p) => p.entity === key))
              return [...prevValue.filter((item) => item.entity !== key), permissions.find((p) => p.entity === key)];
            return [...prevValue, permissions.find((p) => p.entity === key)];
          });
        });
    } else {
      selectedRowKeys
        .filter((key) => !newSelectedRowKeys.includes(key))
        .forEach((key) => {
          setSelectedPermissions((prevValue) => prevValue.filter((p) => p.entity !== key));
        });
    }
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <MyDrawer
      title={query.add ? t(`RolQoshish`) : t('Rolni tahrirlash')}
      placement={'right'}
      open={!!query.add || !!query.edit}
      onClose={onCancel}
      width={1500}
      extra={
        <Button onClick={() => form.submit()} type="primary" loading={isLoadingPost || isLoadingUpdate}>
          {t('Saqlash')}
        </Button>
      }
    >
      {isLoadingOne && <SpinLoading />}
      <Form form={form} className={''} layout={'vertical'} onFinish={onFinish}>
        <Form.Item name={'name'} label={t('Role nomi')} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'parentId'} label={t('Ota rol')}>
          <Select className={'mb-2 block'} allowClear={true}>
            {rolesData?.data?.data?.map((item: Record<string, any>) => (
              <Option key={item.id as any} value={item.id}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <div
          style={{
            height: '80vh',
            overflow: 'auto',
          }}
        >
          <AntTable
            css={css`
              .ant-table-thead > tr > th {
                white-space: nowrap !important;
              }

              .ant-table-thead > tr {
                position: sticky;
                top: 0;
                z-index: 3;
              }
            `}
            rowSelection={rowSelection}
            dataSource={permissions.sort((a, b) => {
              const indexA = PermissionsOrder.indexOf(a.entity);
              const indexB = PermissionsOrder.indexOf(b.entity);

              // Agar entity sortOrder massivida bo'lmasa, oxiriga qo'yamiz
              return (
                (indexA === -1 ? PermissionsOrder.length : indexA) - (indexB === -1 ? PermissionsOrder.length : indexB)
              );
            })}
            columns={columns}
            pagination={false}
            rowKey={'entity'}
          />
        </div>
      </Form>
    </MyDrawer>
  );
});

const TreeDrawer = observer(() => {
  const { push, query } = useLocationParams();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { rolesData } = useRoles({ orderBy: { name: 'asc' } });
  const { usersData } = useUsers({
    orderBy: { createdAt: 'asc' },
    include: { roles: true },
    where: {},
  });

  const onCancel = () => {
    form.resetFields();
    push({ query: { tree: undefined } }, { update: true });
  };

  const onFinish = async (values: any) => {
    onCancel();
  };

  const tree = useMemo(() => buildTree(rolesData?.data?.data || [], null), [rolesData]);

  const RoleTree = ({ node }: { node: Record<string, any> }) => {
    return (
      <li className="border-l-2 p-2">
        {node.name}
        {node.children.length > 0 && (
          <ul>
            {node.children.map((child: Record<string, any>) => (
              <RoleTree key={child.id} node={child} />
            ))}
          </ul>
        )}
        <ul>
          {usersData?.data?.data
            ?.filter((user: Record<string, any>) => user.roles.find((r: Record<string, any>) => r.id == node.id))
            .map((user: Record<string, any>) => (
              <li key={user.id} className="ml-4 text-blue-500">
                {user.username}
              </li>
            ))}
        </ul>
      </li>
    );
  };

  return (
    <MyDrawer
      title={t('Tree')}
      placement={'right'}
      open={!!query.tree}
      onClose={onCancel}
      width={1000}
      // extra={
      //   <Button onClick={() => form.submit()} type="primary" loading={isLoadingPost || isLoadingUpdate}>
      //     {t('Saqlash')}
      //   </Button>
      // }
      css={css`
        .tree ul {
          padding-left: 20px;
          list-style-type: none;
        }
        .tree li {
          padding: 5px;
          margin: 5px 0;
          border-left: 1px solid #ddd;
        }
        .tree li::before {
          content: '';
          position: relative;
          top: -0.5em;
          left: -1.1em;
          border-top: 1px solid #ddd;
          width: 1em;
          height: 0.5em;
          display: inline-block;
        }
      `}
    >
      <p>Tree</p>
      <div className="tree">
        <ul>
          {tree.map((role) => (
            <RoleTree key={role.id} node={role} />
          ))}
        </ul>
      </div>
    </MyDrawer>
  );
});

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout>{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default Page;
