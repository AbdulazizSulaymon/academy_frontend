import { Box } from '@components/box';
import { css } from '@emotion/react';
import { useLocationParams } from '@hooks/use-location-params';
import { useUserMe } from '@hooks/use-user-me';
import { leadHistoriesQueryKey, useCreateLeadHistory } from '@src/queries/models/lead-history';
import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useMyTheme } from '@hooks/use-my-theme';
import { useLayoutStore } from '@/stores/layout-store';
import { UploadInput } from '@components/form/auto-form';

interface Props {
  className?: string;
}

const LeaveComment: React.FC<Props> = observer(({ className }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { isDarkMode } = useMyTheme();
  const { query } = useLocationParams();
  const { user } = useUserMe();
  const { permissions } = useLayoutStore();

  const { createLeadHistory, isSuccess, isError } = useCreateLeadHistory(
    {},
    { invalidateQueries: [leadHistoriesQueryKey] },
  );

  const handleCancel = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      toast.success(t('Comment sent'));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error(t('Error sending comment'));
    }
  }, [isError]);

  const onFinish = (values: any) => {
    createLeadHistory({
      lead: {
        connect: { id: query.id },
      },
      type: 'Comment',
      leadComment: {
        create: {
          text: values.comment,
          file: form.getFieldValue('file'),
          user: {
            connect: { id: user?.id },
          },
        },
      },
    });
  };

  return (
    <Box
      className={`rounded-xl p-4 ${className}`}
      css={css`
        border: 1px solid ${isDarkMode ? '#2d2d2d' : '#ececec'};
      `}
    >
      <div className="mb-2 text-[12px] font-medium text-gray-500">{t('Comment')}</div>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ comment: '', file: null }}
        css={css`
          .ant-form-item {
            margin-bottom: 10px;
          }
        `}
      >
        <Form.Item
          name="comment"
          rules={[
            {
              required: true,
              message: t('Please enter a comment') as string,
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder={t('Leave a comment') + '...'} />
        </Form.Item>
        <UploadInput form={form} field={{ name: 'file', accept: '/*' }} view={false} />
        <Form.Item className={'mt-2'}>
          <Button disabled={!permissions['CreateLeadComment']} type="primary" htmlType="submit" className="mr-2">
            {t('Send')}
          </Button>
          <Button onClick={handleCancel}>{t('Cancel')}</Button>
        </Form.Item>
      </Form>
    </Box>
  );
});

export default LeaveComment;
