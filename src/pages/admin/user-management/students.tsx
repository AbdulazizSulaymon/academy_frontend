import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Descriptions, Tag } from 'antd';
import dayjs from 'dayjs';
import { get } from 'lodash';
import { observer } from 'mobx-react';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useApi } from '@/api';
import { NextPageWithLayout } from '@/types';
import { useUsers, usersQueryKey } from '@/queries/models/user';
import { useCourseEnrollments } from '@/queries/models/course-enrollment';
import { useUserAssignments } from '@/queries/models/user-assignment';
import { useUserTestResults } from '@/queries/models/user-test-result';
import { useCoinHistories } from '@/queries/models/coin-history';
import { useOrders } from '@/queries/models/order';
import { AdminLayout } from '@/widgets/dashboard-layout/layouts';

import { Box } from '@components/box';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';

import { DynamicProviders } from '@hocs/dynamic-providers';

import { useLocationParams } from '@hooks/use-location-params';
import { useNotification } from '@hooks/use-notification';
import { useTableFetchProps } from '@hooks/use-table-fetch-props';

import { OrderStatus } from '@api/academy-types';

const StudentsPage: NextPageWithLayout = observer(function Home() {
  const { t } = useTranslation();
  const { push } = useLocationParams();
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess } = useNotification();

  const columns = useMemo(
    () => [
      numericColumn(),
      {
        title: t('First Name') || 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        width: 120,
      },
      {
        title: t('Last Name') || 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        width: 120,
      },
      {
        title: t('Email') || 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 200,
      },
      {
        title: t('Phone') || 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: 130,
      },
      {
        title: t('Coins') || 'Coins',
        dataIndex: 'coins',
        key: 'coins',
        width: 100,
        render: (coins: number) => <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>{coins}</span>,
      },
      {
        title: t('Region') || 'Region',
        dataIndex: 'region',
        key: 'region',
        width: 120,
      },
      {
        title: t('Is Active') || 'Is Active',
        dataIndex: 'isActive',
        key: 'isActive',
        width: 100,
        render: (value: boolean) => (
          <span style={{ color: value ? 'green' : 'red' }}>
            {value ? t('Active') || 'Active' : t('Inactive') || 'Inactive'}
          </span>
        ),
      },
      {
        title: t('Created At') || 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm'),
        width: 150,
      },
    ],
    [t],
  );

  const tableFetchProps = useTableFetchProps();
  const { data, isLoading, isError } = useUsers(
    {
      ...tableFetchProps,
      where: { roles: { some: { name: 'student' } } },
      orderBy: { createdAt: 'desc' },
    },
    { enabled: !!tableFetchProps.take },
  );

  const viewCallback = useCallback(
    (data: Record<string, any>) => push({ view: true, id: data.id }, { update: true }),
    [push],
  );

  return (
    <Box>
      <StudentDetailDrawer />
      <Table
        name="Students"
        queryKey={[usersQueryKey]}
        dataSource={data?.data?.data || []}
        columns={columns}
        size="small"
        loading={isLoading}
        total={get(data, 'data.totalCount', 0)}
        addCallback={undefined}
        editCallback={undefined}
        removeCallback={undefined}
        viewCallback={viewCallback}
        error={isError}
      />
    </Box>
  );
});

const StudentDetailDrawer = observer(() => {
  const { query, push } = useLocationParams();
  const api = useApi();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'assignments' | 'tests' | 'orders' | 'coins'>('overview');

  const { data: student, isLoading: isLoadingStudent } = useQuery({
    queryKey: ['student', query.id],
    queryFn: () =>
      api.apis.User.findOne({
        where: { id: query.id },
        include: {
          roles: true,
        },
      }),
    enabled: !!query.id && !!query.view,
  });

  const { data: enrollments } = useCourseEnrollments(
    {
      where: { userId: query.id },
      include: { course: true },
      orderBy: { enrolledAt: 'desc' },
    },
    { enabled: !!query.id && !!query.view },
  );

  const { data: userAssignments } = useUserAssignments(
    {
      where: { userId: query.id },
      include: { assignment: { include: { course: true } } },
      orderBy: { createdAt: 'desc' },
    },
    { enabled: !!query.id && !!query.view },
  );

  const { data: testResults } = useUserTestResults(
    {
      where: { userId: query.id },
      include: { test: true, lesson: true },
      orderBy: { completedAt: 'desc' },
    },
    { enabled: !!query.id && !!query.view },
  );

  const { data: coinHistory } = useCoinHistories(
    {
      where: { userId: query.id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    },
    { enabled: !!query.id && !!query.view },
  );

  const { data: orders } = useOrders(
    {
      where: { userId: query.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
    },
    { enabled: !!query.id && !!query.view },
  );

  const onClose = () => {
    push({ view: undefined, id: undefined }, { update: true });
    setActiveTab('overview');
  };

  const getCoinTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Earned: 'green',
      Spent: 'red',
      Bonus: 'blue',
      Refund: 'orange',
    };
    return colors[type] || 'default';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Available: 'green',
      NotSubmitted: 'orange',
      Submitted: 'blue',
      Graded: 'purple',
      IN_PROGRESS: 'blue',
      COMPLETED: 'green',
      PASSED: 'green',
      FAILED: 'red',
      EXPIRED: 'red',
      // Order Statuses
      [OrderStatus.Pending]: 'orange',
      [OrderStatus.Processing]: 'blue',
      [OrderStatus.Completed]: 'green',
      [OrderStatus.Canceled]: 'red',
    };
    return colors[status] || 'default';
  };

  if (!query.view) return null;

  return (
    <MyDrawer
      title={`${t('Student') || 'Student'}: ${student?.data?.firstName || ''} ${student?.data?.lastName || ''}`}
      open={query.view}
      onClose={onClose}
      width={900}
    >
      {isLoadingStudent ? (
        <div>Loading...</div>
      ) : student?.data ? (
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b pb-2">
            {[
              { key: 'overview', label: t('Overview') || 'Overview' },
              { key: 'courses', label: t('Courses') || 'Courses' },
              { key: 'assignments', label: t('Assignments') || 'Assignments' },
              { key: 'tests', label: t('Tests') || 'Tests' },
              { key: 'orders', label: t('Orders') || 'Orders' },
              { key: 'coins', label: t('Coins') || 'Coins' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-t ${
                  activeTab === tab.key ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <Descriptions title={t('Personal Information') || 'Personal Information'} bordered column={2}>
                <Descriptions.Item label={t('First Name') || 'First Name'}>{student.data.firstName}</Descriptions.Item>
                <Descriptions.Item label={t('Last Name') || 'Last Name'}>{student.data.lastName}</Descriptions.Item>
                <Descriptions.Item label={t('Email') || 'Email'}>{student.data.email}</Descriptions.Item>
                <Descriptions.Item label={t('Phone') || 'Phone'}>{student.data.phone || '-'}</Descriptions.Item>
                <Descriptions.Item label={t('Coins') || 'Coins'}>
                  <span style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: '18px' }}>
                    {student.data.coins || 0}
                  </span>
                </Descriptions.Item>
                <Descriptions.Item label={t('Region') || 'Region'}>{student.data.region || '-'}</Descriptions.Item>
                <Descriptions.Item label={t('Address') || 'Address'}>{student.data.address || '-'}</Descriptions.Item>
                <Descriptions.Item label={t('Birth Date') || 'Birth Date'}>
                  {student.data.birthDate ? dayjs(student.data.birthDate).format('DD.MM.YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label={t('Is Active') || 'Is Active'}>
                  <Tag color={student.data.isActive ? 'green' : 'red'}>
                    {student.data.isActive ? t('Active') || 'Active' : t('Inactive') || 'Inactive'}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label={t('Role') || 'Role'}>
                  <div className="flex gap-1 flex-wrap">
                    {student.data.roles?.map((role: any) => (
                      <Tag key={role.id} color="blue">
                        {role.name}
                      </Tag>
                    )) || '-'}
                  </div>
                </Descriptions.Item>
                <Descriptions.Item label={t('Created At') || 'Created At'}>
                  {dayjs(student.data.createdAt).format('DD.MM.YYYY HH:mm')}
                </Descriptions.Item>
                <Descriptions.Item label={t('Last Login') || 'Last Login'}>
                  {student.data.lastLogin ? dayjs(student.data.lastLogin).format('DD.MM.YYYY HH:mm') : '-'}
                </Descriptions.Item>
              </Descriptions>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{enrollments?.data?.data?.length || 0}</div>
                  <div className="text-sm text-gray-600">{t('Enrolled Courses') || 'Enrolled Courses'}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {enrollments?.data?.data?.filter((e: any) => e.isCompleted).length || 0}
                  </div>
                  <div className="text-sm text-gray-600">{t('Completed Courses') || 'Completed Courses'}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {userAssignments?.data?.data?.filter((ua: any) => ua.status === 'Graded').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">{t('Graded Assignments') || 'Graded Assignments'}</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {testResults?.data?.data?.filter((tr: any) => tr.status === 'PASSED').length || 0}
                  </div>
                  <div className="text-sm text-gray-600">{t('Passed Tests') || 'Passed Tests'}</div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('Enrolled Courses') || 'Enrolled Courses'}</h3>
              <div className="space-y-3">
                {enrollments?.data?.data?.map((enrollment: any) => (
                  <div key={enrollment.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{enrollment.course?.titleUz}</h4>
                        <p className="text-sm text-gray-500">
                          {t('Enrolled') || 'Enrolled'}: {dayjs(enrollment.enrolledAt).format('DD.MM.YYYY')}
                        </p>
                      </div>
                      <div className="text-right">
                        <Tag color={enrollment.isCompleted ? 'green' : 'blue'}>
                          {enrollment.isCompleted ? t('Completed') || 'Completed' : `${enrollment.progress}%`}
                        </Tag>
                        {enrollment.completedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            {dayjs(enrollment.completedAt).format('DD.MM.YYYY')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('Assignments') || 'Assignments'}</h3>
              <div className="space-y-3">
                {userAssignments?.data?.data?.map((ua: any) => (
                  <div key={ua.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{ua.assignment?.titleUz}</h4>
                        <p className="text-sm text-gray-500">{ua.assignment?.course?.titleUz}</p>
                        {ua.submittedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            {t('Submitted') || 'Submitted'}: {dayjs(ua.submittedAt).format('DD.MM.YYYY HH:mm')}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Tag color={getStatusColor(ua.status)}>{ua.status}</Tag>
                        {ua.score !== null && ua.score !== undefined && (
                          <p className="text-sm font-medium mt-1">
                            {ua.score}/{ua.assignment?.maxScore || 100}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tests Tab */}
          {activeTab === 'tests' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('Test Results') || 'Test Results'}</h3>
              <div className="space-y-3">
                {testResults?.data?.data?.map((tr: any) => (
                  <div key={tr.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{tr.test?.titleUz}</h4>
                        <p className="text-sm text-gray-500">{tr.lesson?.titleUz}</p>
                        {tr.completedAt && (
                          <p className="text-xs text-gray-500 mt-1">
                            {t('Completed') || 'Completed'}: {dayjs(tr.completedAt).format('DD.MM.YYYY HH:mm')}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <Tag color={getStatusColor(tr.status)}>{tr.status}</Tag>
                        <p className="text-sm font-medium mt-1">
                          {tr.score}/{tr.test?.passingScore || 0}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('Attempt') || 'Attempt'} {tr.attemptNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('Orders') || 'Orders'}</h3>
              <div className="space-y-3">
                {orders?.data?.data?.map((order: any) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-lg">#{order.orderNumber}</h4>
                        <p className="text-sm text-gray-500">
                          {dayjs(order.createdAt).format('DD.MM.YYYY HH:mm')}
                        </p>
                      </div>
                      <div className="text-right">
                        <Tag color={getStatusColor(order.status)}>{order.status}</Tag>
                        <p className="text-lg font-bold text-orange-500 mt-1">
                          {order.totalCoins} {t('coins') || 'coins'}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        {t('Products') || 'Products'}:
                      </p>
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                          <div className="flex-1">
                            <p className="font-medium">{item.product?.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.product?.level} × {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">{item.priceCoins * item.quantity} 🪙</p>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Info */}
                    {(order.deliveryAddress || order.deliveryPhone) && (
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {order.deliveryPhone && (
                            <div>
                              <span className="text-gray-500">{t('Phone') || 'Phone'}:</span>
                              <span className="ml-2 font-medium">{order.deliveryPhone}</span>
                            </div>
                          )}
                          {order.deliveryAddress && (
                            <div className="col-span-2">
                              <span className="text-gray-500">{t('Address') || 'Address'}:</span>
                              <span className="ml-2 font-medium">{order.deliveryAddress}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Completed At */}
                    {order.completedAt && (
                      <div className="mt-2 text-xs text-gray-500">
                        {t('Completed') || 'Completed'}: {dayjs(order.completedAt).format('DD.MM.YYYY HH:mm')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coins Tab */}
          {activeTab === 'coins' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('Coin History') || 'Coin History'}</h3>
              <div className="space-y-2">
                {coinHistory?.data?.data?.map((ch: any) => (
                  <div key={ch.id} className="border rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{ch.description || ch.type}</p>
                      <p className="text-xs text-gray-500">{dayjs(ch.createdAt).format('DD.MM.YYYY HH:mm')}</p>
                    </div>
                    <div className="text-right">
                      <Tag color={getCoinTypeColor(ch.type)}>
                        {ch.type === 'Earned' || ch.type === 'Bonus' ? '+' : '-'}
                        {Math.abs(ch.amount)}
                      </Tag>
                      <p className="text-xs text-gray-500 mt-1">
                        {t('Balance') || 'Balance'}: {ch.balanceAfter}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Student not found</div>
      )}
    </MyDrawer>
  );
});

StudentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DynamicProviders>
      <AdminLayout title="Students">{page}</AdminLayout>
    </DynamicProviders>
  );
};

export default StudentsPage;
