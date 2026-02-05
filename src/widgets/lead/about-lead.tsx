import { useApi } from '@src/api';
import { Box } from '@components/box';
import { AutoForm, SelectMode } from '@components/form/auto-form';
import Information from '@components/information';
import { MyDrawer } from '@components/my-drawer';
import { css } from '@emotion/react';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';
import useLocalizedString from '@hooks/use-transform-string';
import { leadQueryKey, leadsQueryKey } from '@src/queries/models/lead';
import { useQueryClient } from '@tanstack/react-query';
import {
  convertNullToUndefined,
  datesToDayjs,
  defaultDateFormat,
  generatePrismaConnectDisconnect,
  getImagePath,
} from '@utils/util';
import { Button, Divider, Form, Spin } from 'antd';
import { observer } from 'mobx-react';
import React, { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useMyTheme } from '@hooks/use-my-theme';
import { MdOutlineDownload } from 'react-icons/md';
import { useLeadStatuses } from '@src/queries/models/lead-status';
import Link from 'next/link';
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineMap,
  HiOutlineChatAlt,
  HiOutlineTag,
} from 'react-icons/hi';
import { useLayoutStore } from '@/stores/layout-store';
import { usePartners } from '@src/queries/models/partner';

interface AboutLeadProps {
  lead: Record<any, any>;
}

const AboutLead: FC<AboutLeadProps> = observer(({ lead }) => {
  const { t } = useTranslation();
  const { query } = useLocationParams();
  const { isDarkMode } = useMyTheme();
  const { push } = useLocationParams();
  const [leadInputs, setLeadInputs] = React.useState<Record<any, any>[]>([]);

  const getPartnerName = (partner: any) => {
    const u = partner?.user;
    const name = [u?.firstName, u?.lastName].filter(Boolean).join(' ');
    return name || partner?.referralCode || partner?.id || t('Not filled');
  };

  const getFileName = (filePath: string) => {
    const fileName = decodeURIComponent(filePath.split('/').pop() || '');
    const actualFileName = fileName.split('-').slice(1).join('-');
    return actualFileName;
  };

  useEffect(() => {
    if (lead) {
      const arr = [];
      const data = lead.data || {};

      // Contact Information (CRM)
      arr.push(
        {
          label: (
            <span className="flex items-center gap-2">
              <HiOutlineTag className="text-gray-500" size={16} />
              {t('Title')}
            </span>
          ),
          defaultValue: lead.title || t('Not filled'),
        },
        {
          label: (
            <span className="flex items-center gap-2">
              <HiOutlineUser className="text-gray-500" size={16} />
              {t('First Name')}
            </span>
          ),
          defaultValue: data.first_name || data.firstName || t('Not filled'),
        },
        {
          label: (
            <span className="flex items-center gap-2">
              <HiOutlineUser className="text-gray-500" size={16} />
              {t('Last Name')}
            </span>
          ),
          defaultValue: data.last_name || data.lastName || t('Not filled'),
        },
        {
          label: (
            <span className="flex items-center gap-2">
              <HiOutlineMail className="text-gray-500" size={16} />
              {t('Email')}
            </span>
          ),
          defaultValue: data.email || t('Not filled'),
        },
        {
          label: (
            <span className="flex items-center gap-2">
              <HiOutlinePhone className="text-gray-500" size={16} />
              {t('Phone')}
            </span>
          ),
          defaultValue: data.phone || t('Not filled'),
        },
      );

      // Next call date (follow-up)
      const nextCallDate = lead.nextCallDate ? defaultDateFormat(lead.nextCallDate) : t('Not filled');
      arr.push({
        label: (
          <span className="flex items-center gap-2">
            <HiOutlineCalendar className="text-blue-500" size={16} />
            {t('Next Call Date')}
          </span>
        ),
        defaultValue: nextCallDate,
      });

      // Location
      arr.push({
        label: (
          <span className="flex items-center gap-2">
            <HiOutlineMap className="text-red-500" size={16} />
            {t('Location')}
          </span>
        ),
        defaultValue: lead.location ? (
          <Link href={lead.location} target={'_blank'}>
            {t('Link')}
          </Link>
        ) : (
          t('Not filled')
        ),
        lg: 24,
      });

      // Comment
      arr.push({
        label: (
          <span className="flex items-center gap-2">
            <HiOutlineChatAlt className="text-gray-500" size={16} />
            {t('Comment')}
          </span>
        ),
        defaultValue: lead.comment || t('Not filled'),
        lg: 24,
      });

      // Additional data fields (custom fields)
      for (const key in lead.data) {
        const processedFields = ['first_name', 'firstName', 'last_name', 'lastName', 'email', 'phone', 'extraPhones'];
        if (processedFields.includes(key)) continue;

        if (typeof lead.data[key] === 'string' && lead.data[key].startsWith('uploads/'))
          arr.push({
            label: (
              <span className="flex items-center gap-2">
                <MdOutlineDownload className="text-blue-500" size={16} />
                {key}
              </span>
            ),
            defaultValue: (
              <Button
                type={'link'}
                icon={<MdOutlineDownload />}
                href={getImagePath(lead.data[key])}
                target="_blank"
                rel="noopener noreferrer"
                download={getFileName(lead.data[key])}
              >
                {getFileName(lead.data[key])}
              </Button>
            ),
          });
        else
          arr.push({
            label: (
              <span className="flex items-center gap-2">
                <HiOutlineTag className="text-gray-500" size={16} />
                {key}
              </span>
            ),
            defaultValue: lead.data[key] || t('Not filled'),
          });
      }

      setLeadInputs([...arr]);
    }
  }, [lead, t]);

  const handleEditLid = () => {
    push({ query: { editLid: true } }, { update: true });
  };
  const { permissions } = useLayoutStore();

  return (
    <Box
      css={css`
        border: 1px solid ${isDarkMode ? '#2d2d2d' : '#ececec'};
      `}
      className={'h-fit'}
    >
      {query.editLid && <CreateUpdateLeadDrawer />}
      <div className="flex items-center justify-between">
        <span className="text-gray3">{t('About Lead').toUpperCase()}</span>
        {lead?.status !== 'Canceled' && lead?.status !== 'Successfully' && (
          <Button disabled={!permissions['UpdateLead']} onClick={handleEditLid}>
            {t('Edit')}
          </Button>
        )}
      </div>
      <Divider />
      <Information fields={leadInputs} mdColumnSize={1} lgColumnSize={2} />
      <Divider />
      <div className="mt-4 flex flex-col gap-2">
        <span className={`text-[11px] ${isDarkMode ? 'text-gray2' : 'text-gray6'}`}>
          {t('Responsible Specialists')}
        </span>
        {!!lead?.specialists?.length && (
          <div
            className="flex cursor-pointer flex-col gap-2 rounded-md p-4"
            css={css`
              border: 1px solid ${isDarkMode ? '#2d2d2d' : '#ececec'};
            `}
          >
            <div className={'flex items-center gap-3'}>
              <div
                className={`flex flex-col justify-end gap-2 text-[13px] ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-500'
                }`}
              >
                {lead?.specialists.map((item: any) => (
                  <>
                    <div className={'flex items-center gap-3'}>
                      <div
                        className={`flex items-center justify-end gap-2 text-[13px] ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-500'
                        }`}
                      >
                        {item?.photo && (
                          <img
                            className={'rounded-full'}
                            src={getImagePath(item?.profile?.photo)}
                            alt={'profile'}
                            style={{ width: '18px', height: '18px', objectFit: 'cover' }}
                          />
                        )}
                        {!item?.photo && (
                          <div
                            className={
                              'grid h-[18px] w-[18px] place-items-center rounded-full bg-amber-600 text-[11px] text-white'
                            }
                          >
                            {getPartnerName(item)?.slice(0, 1)}
                          </div>
                        )}
                      </div>
                      <span className="text-primary font-light">{getPartnerName(item)}</span>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
        {!lead?.specialists?.length && (
          <span className={'information-value text-gray4'}>{t('Not assigned to anyone')}</span>
        )}
      </div>
    </Box>
  );
});

export const CreateUpdateLeadDrawer = observer(() => {
  const { t } = useTranslation();
  const { localizeString } = useLocalizedString();
  const { query } = useLocationParams();
  const { push } = useLocationParams();
  const [form] = Form.useForm();
  const api = useApi();
  const queryClient = useQueryClient();

  const { leadStatusesData } = useLeadStatuses({ orderBy: { order: 'asc' }, take: 1 });
  const firstStatusId = leadStatusesData?.data?.data?.[0]?.id;

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById } = useCrudModal({
    name: leadsQueryKey,
    model: api.apis.Lead,
    getOne: () =>
      api.apis.Lead.findOne({
        include: {
          leadStatus: true,
          specialists: { include: { user: true } },
        },
        where: { id: query.id },
      }),
    onSuccess: () => {
      // Invalidate lead queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: [leadQueryKey] });
      queryClient.invalidateQueries({ queryKey: [leadsQueryKey] });
      queryClient.invalidateQueries({ queryKey: ['lead-histories'] });
      // Refetch the current lead data in lead drawer
      if (query.id) {
        queryClient.refetchQueries({
          queryKey: [leadsQueryKey, query.id],
          exact: false,
        });
      }
    },
  });

  const onCancel = () => {
    form.resetFields();
    push({ query: { editLid: undefined, createLid: undefined } }, { update: true });
  };

  const onFinish = async (values: any) => {
    const data = convertNullToUndefined(values);

    const specialists = generatePrismaConnectDisconnect(
      dataById?.data.specialists?.map((item: any) => ({ id: item.id })) || [],
      values.specialists?.map((id: any) => ({ id })) || [],
    );

    const phone = values.phones?.[0]?.phone;
    const extraPhones = values.phones
      ?.slice(1)
      ?.map((item: any) => item.phone)
      .filter((item: any) => item !== '+998');
    delete data.phones;

    // Update the lead
    if (query.editLid) {
      update({
        data: {
          ...data,
          data: {
            ...dataById?.data.data,
            phone: phone !== '+998' ? phone : undefined,
            extraPhones,
          },
          specialists,
        },
        where: {
          id: dataById?.data.id,
        },
      });
    } else if (query.createLid) {
      post({
        data: {
          ...data,
          data: {
            phone: phone !== '+998' ? phone : undefined,
            extraPhones,
          },
          leadStatus: firstStatusId ? { connect: { id: firstStatusId } } : undefined,
          statusUpdatedAt: new Date(),
          specialists,
        },
      });
    }
  };

  useEffect(() => {
    if (query.editLid && dataById?.data)
      form.setFieldsValue(
        datesToDayjs(
          {
            ...dataById?.data,
            title: dataById?.data.title,
            specialists: dataById?.data.specialists.map((item: any) => item.id),
            phones: [
              ...[dataById?.data.data.phone]
                .filter(Boolean)
                .map((phone: any) => ({ phone: phone.replace(/^\+998/, '') })),
              ...(dataById?.data.data.extraPhones || []).map((phone: any) => ({
                phone: phone.replace(/^\+998/, ''),
              })),
            ],
          },
          ['nextCallDate'],
        ),
      );
  }, [dataById?.data, query.editLid]);

  const { partnersData } = usePartners({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 500,
  });

  const fieldsCreat = useMemo(
    () => [
      {
        label: t('Title'),
        name: 'title',
        rules: [{ required: true }],
      },
      // {
      //   label: t('Client'),
      //   name: 'client',
      // },
      {
        label: t('Responsible Specialists'),
        name: 'specialists',
        type: 'select',
        mode: 'multiple' as SelectMode,
        options: partnersData?.data.data?.map((p: any) => ({
          value: p.id,
          label: [p?.user?.firstName, p?.user?.lastName].filter(Boolean).join(' ') || p?.referralCode || p.id,
        })),
      },
      {
        label: t('Phone'),
        name: 'phones',
        type: 'list',
        md: 24,
        initialChildAmount: 1,
        childFields: [
          {
            label: t('Phone'),
            name: 'phone',
            addonBefore: '+998',
          },
        ],
      },
      {
        label: t('Next Call Date'),
        name: 'nextCallDate',
        type: 'datepicker',
        md: 24,
      },
      {
        label: t('Location'),
        name: 'location',
        md: 24,
      },
      {
        label: t('Comment'),
        name: 'comment',
        type: 'textarea',
        md: 24,
      },
    ],
    [t, partnersData],
  );

  return (
    <MyDrawer
      width={800}
      title={query.createLid ? t('Add Lead') : t('Edit Lead')}
      onClose={onCancel}
      open={!!query.createLid || !!query.editLid}
      extra={
        <Button
          onClick={() => form.submit()}
          type="primary"
          loading={isLoadingPost || isLoadingUpdate}
          disabled={!firstStatusId}
        >
          {t('Save')}
        </Button>
      }
    >
      {isLoadingOne && <Spin />}

      <AutoForm
        form={form}
        fields={fieldsCreat}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingPost || isLoadingUpdate}
        saveTitle={t('Add')}
        cancelTitle={t('Cancel')}
        hideButtons
        mdColumnSize={2}
      />
    </MyDrawer>
  );
});

export default AboutLead;
