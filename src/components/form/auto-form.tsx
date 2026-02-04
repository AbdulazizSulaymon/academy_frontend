import { css } from '@emotion/react';
import '@mdxeditor/editor/style.css';
import {
  AutoComplete,
  Button,
  Card,
  Checkbox,
  Col,
  ColorPicker,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Skeleton,
  Space,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { FormInstance, Rule } from 'antd/es/form';
import { UploadListType } from 'antd/es/upload/interface';
import clsx from 'clsx';
import { isFunction, isNull, isString } from 'lodash';
import dynamic from 'next/dynamic';
import React, { CSSProperties, FC, Key, ReactNode, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineClose } from 'react-icons/ai';
import { FiMinusCircle as MinusCircleOutlined, FiPlus as PlusOutlined } from 'react-icons/fi';

import { SpinLoading } from '@components/loading';
import { MarkdownEditor } from '@components/markdown-editor';
import { FileResponse, UploadFile } from '@components/upload';

import { useLocationParams } from '@hooks/use-location-params';

const { RangePicker } = DatePicker;
const { Text } = Typography;
const { TextArea } = Input;

const Editor = dynamic(() => import('../../../src/components/mdx-editor'), {
  ssr: false,
});

export type ListItemContainer = {
  children: ReactNode;
  field: FormField;
  index: number;
  remove: () => void;
};

export type SelectMode = 'multiple' | 'tags' | undefined;

export type FormField = {
  label?: string | ReactNode;
  addonBefore?: string;
  addonAfter?: string;
  listLabel?: string;
  initialChildAmount?: number;
  labelContainer?: string;
  name: string;
  note?: string;
  aspectRatio?: number;
  type?: string;
  rules?: Rule[] | undefined;
  className?: string;
  options?: { label: string | ReactNode; value: string | boolean | number }[];
  mode?: SelectMode;
  showSelectAll?: boolean;
  showCrop?: boolean;
  dynamic?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  rows?: number;
  min?: number;
  max?: number;
  loading?: boolean;
  defaultValue?: any;
  accept?: string;
  span?: number;
  autoSize?: boolean;
  childFields?: FormField[];
  addButton?: string | ReactNode;
  collapse?: boolean;
  ListItemContainer?: FC<ListItemContainer>;
  colStyle?: CSSProperties;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  listType?: UploadListType;
  fileMultiple?: boolean;
  showTime?: boolean;
  onChange?: any;
  onSearch?: any;
  tooltip?: string;
};

export const getActualPath = (res: FileResponse) => {
  if (res.uploadPath.indexOf('public/') == -1) return res.uploadPath;
  const idx = res.uploadPath.indexOf('public/') + 7;
  return res.uploadPath.slice(idx > -1 ? idx : 0);
};

export const UploadInput = ({ form, field, view }: { form: FormInstance<any>; field: FormField; view?: boolean }) => {
  const [resUpload, setResUpload] = useState<undefined | null | FileResponse | FileResponse[]>(undefined);
  const pathFiles = useMemo(
    () =>
      resUpload
        ? Array.isArray(resUpload)
          ? resUpload.map((item) => getActualPath(item))
          : getActualPath(resUpload)
        : undefined,
    [resUpload],
  );

  useEffect(() => {
    if (resUpload == undefined) return;
    form.setFieldValue(field.name, pathFiles);
  }, [pathFiles]);

  const defaultFile = Form.useWatch(field.name, form);

  return (
    <UploadFile
      onSuccess={setResUpload}
      defaultFile={defaultFile}
      accept={field.accept}
      listType={field.listType}
      disabled={field.readOnly || view}
      multiple={field.fileMultiple}
      aspectRatio={field.aspectRatio}
      showCrop={field.showCrop}
    />
  );
};

export const Note = ({ note }: { note?: string }) => {
  return note ? (
    <Text type="secondary" className="text-xs">
      {note}
    </Text>
  ) : (
    ''
  );
};

export const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const MdInput = ({ value, onChange, field }: { value?: any; onChange?: (val: any) => void; field: FormField }) => {
  const setValueHandler = (val: string | null) => {
    if (!isNull(val) && isFunction(onChange)) {
      onChange(val);
    }
  };

  return (
    <MarkdownEditor
      value={value}
      collapse={field.collapse}
      setValue={setValueHandler}
      initialValue={field.defaultValue}
      readOnly={field.readOnly}
    />
  );
};

const DefaultListItemContainer = ({ children, field, remove, index }: ListItemContainer) => {
  return (
    <Card
      className="my-2"
      size="small"
      title={`${field?.label} ${index + 1}`}
      extra={
        <Button type={'text'} className={''} onClick={remove}>
          <AiOutlineClose className="text-red-500" />
        </Button>
      }
    >
      {children}
    </Card>
  );
};

// eslint-disable-next-line react/display-name
export const AutoForm = React.memo(
  ({
    form,
    fields,
    onCancel,
    onFinish,
    isSaveLoading,
    cancelTitle = 'Cancel',
    saveTitle = 'Save',
    columnSize = 1,
    xsColumnSize = 1,
    mdColumnSize,
    smColumnSize,
    lgColumnSize,
    xlColumnSize,
    xxlColumnSize,
    className,
    inline,
    hideButtons,
    view = false,
    loading,
    onValuesChange,
  }: {
    form?: FormInstance<any>;
    fields: FormField[];
    onCancel?: Function;
    onFinish?: (values: any) => void;
    isSaveLoading?: boolean;
    cancelTitle?: string | null;
    saveTitle?: string | null;
    columnSize?: number;
    mdColumnSize?: number;
    xsColumnSize?: number;
    smColumnSize?: number;
    lgColumnSize?: number;
    xlColumnSize?: number;
    xxlColumnSize?: number;
    className?: string;
    inline?: boolean;
    hideButtons?: boolean;
    view?: boolean;
    loading?: boolean;
    onValuesChange?: (changedValues: any, allValues: any) => void;
  }) => {
    return (
      <Form
        form={form}
        name="basic"
        layout={'vertical'}
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={onValuesChange || (() => {})}
        className={clsx({ 'flex gap-2': inline, [className as string]: className })}
        css={css`
          .ant-form-item-label {
            padding-bottom: 4px !important;
          }

          .ant-card-body {
            padding-top: 4px !important;
            padding-bottom: 4px !important;
          }
        `}
      >
        <Row gutter={loading ? [30, 30] : 16}>
          {fields.map((field: FormField, index: number) => (
            <Col
              key={isString(field.name) ? field.name : index}
              span={field.span || 24 / columnSize}
              style={field.colStyle}
              xs={field.xs || (xsColumnSize ? 24 / xsColumnSize : undefined)}
              sm={field.sm || (smColumnSize ? 24 / smColumnSize : undefined)}
              md={field.md || (mdColumnSize ? 24 / mdColumnSize : undefined)}
              lg={field.lg || (lgColumnSize ? 24 / lgColumnSize : undefined)}
              xl={field.xl || (xlColumnSize ? 24 / xlColumnSize : undefined)}
              xxl={field.xxl || (xxlColumnSize ? 24 / xxlColumnSize : undefined)}
            >
              {loading ? (
                <div className={'flex flex-col gap-3'}>
                  <Skeleton active title={{ width: '30%' }} paragraph={false} />
                  <Skeleton.Input active size={'large'} style={{ width: '70%' }} />
                </div>
              ) : (
                <Field
                  fieldName={field.name}
                  field={field}
                  form={form as FormInstance}
                  columnSize={columnSize}
                  onChange={field.onChange}
                  view={view}
                />
              )}
            </Col>
          ))}
        </Row>

        {!hideButtons && (
          <div className={'mb-0 mt-5 flex items-center justify-end text-right'}>
            {onCancel && (
              <Button className={'mr-4'} onClick={() => onCancel()}>
                {cancelTitle}
              </Button>
            )}
            <Button type="primary" htmlType="submit" loading={isSaveLoading}>
              {saveTitle}
            </Button>
          </div>
        )}
      </Form>
    );
  },
);

// eslint-disable-next-line react/display-name
const Field = React.memo(
  ({
    field,
    form,
    fieldName,
    fullFieldName,
    columnSize = 1,
    onChange,
    view,
  }: {
    field: FormField;
    fieldName: any;
    fullFieldName?: any;
    form: FormInstance<any>;
    columnSize?: number;
    onChange: any;
    view?: boolean;
  }) => {
    if (!fullFieldName) fullFieldName = fieldName;
    if (!field.type && field.options) field.type = 'select';
    if (!field.type && field.childFields) field.type = 'list';
    const { t } = useTranslation();
    const { query } = useLocationParams();

    const [selectedValues, setSelectedValues] = useState<any[]>(field.defaultValue || []);
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(field.defaultValue?.length === field.options?.length);

    const handleSelectAll = (checked: boolean) => {
      if (checked) {
        const allValues = field.options?.map((option) => option.value);
        form.setFieldValue(fieldName, allValues);
        setSelectedValues(allValues || []);
      } else {
        form.setFieldValue(fieldName, []);
        setSelectedValues([]);
      }
      setIsSelectAllChecked(checked);
    };

    const handleSelectChange = (value: any) => {
      if (onChange) onChange(value);
      form.setFieldValue(fieldName, value);
      setSelectedValues(value);
      setIsSelectAllChecked(value?.length === field.options?.length);
    };

    useEffect(() => {
      if (field.type === 'list' && field.initialChildAmount) {
        const values = form.getFieldValue(fieldName);
        if (values?.length > 0) return;
        form.setFieldsValue({
          [fieldName]: Array.from({ length: field.initialChildAmount || 0 }, () => ({})),
        });
      }
    }, []);

    if (field.dynamic && field.type != 'list')
      return (
        <TooltipWrapper title={field.tooltip}>
          <div className={'mb-2 mt-2 block'}>{field.label}</div>
          <Form.List key={field.name} name={field.name}>
            {(listFields, { add, remove }, { errors }) => (
              <>
                {listFields.map((listField, index) => (
                  <Form.Item
                    // label={index === 0 ? field.label : ''}
                    required={false}
                    key={listField.key}
                    css={css`
                      .ant-form-item-control-input-content {
                        display: flex;
                        align-items: center;
                      }

                      margin-bottom: 1rem !important;
                    `}
                  >
                    <Form.Item validateTrigger={['onChange', 'onBlur']} {...listField} noStyle>
                      {field.type === 'textarea' ? (
                        <TextArea
                          rows={field.rows || 4}
                          autoSize={field.autoSize}
                          className={`my-0 mr-2 ${field.className || ''}`}
                          placeholder={field.placeholder || ''}
                          disabled={view}
                        />
                      ) : (
                        <Input
                          type={field.type || 'text'}
                          className={`my-0 mr-2 ${field.className || ''}`}
                          placeholder={field.placeholder || ''}
                          disabled={view}
                        />
                      )}
                    </Form.Item>
                    <Button type={'text'} onClick={() => remove(listField.name)}>
                      <MinusCircleOutlined />
                    </Button>
                  </Form.Item>
                ))}
                <Form.Item className={'mb-2'}>
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} className={'px-6'}>
                    {t("Qo'shish")}
                  </Button>

                  <Note note={field.note} />
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Note note={field.note} />
        </TooltipWrapper>
      );

    // if (loading) {
    //   return (
    //     <Form.Item
    //       style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '30px' }}
    //       className={`my-2 ${field.className || ''}`}
    //     >
    //       <Skeleton active title={{ width: '80%' }} paragraph={{ width: '100%' }} />
    //     </Form.Item>
    //   );
    // }

    switch (field.type) {
      case 'checkbox':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={''}
              name={fieldName}
              rules={field.rules}
              className={`mb-0 ${field.className || ''}`}
              valuePropName="checked"
            >
              <Checkbox onChange={onChange} disabled={field.readOnly || view}>
                {field.label}
              </Checkbox>
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'bigInt':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              className={`my-2 ${field.className || ''}`}
              rules={[
                ...(field.rules || []),
                {
                  pattern: /^\d+(.\d+)?$/,
                  message: 'Value should contain just number',
                },
                {
                  pattern: /^[\d+(.\d+)?]{0,100}$/,
                  message: 'Value should be less than 100 character',
                },
              ]}
              validateTrigger="onBlur"
              initialValue={field.defaultValue}
            >
              <Input type={'text'} autoComplete={'off'} disabled={field.readOnly || view} />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'rangePicker':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
            >
              <RangePicker disabled={field.readOnly || view} showTime={field.showTime} className={'w-full'} />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'file':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`mb-0 mt-2 ${field.className || ''}`}
              css={css`
                .ant-form-item-control-input {
                  display: none !important;
                  max-height: 0 !important;
                }
              `}
            >
              <Input
                css={css`
                  display: none !important;
                `}
                disabled={view}
              />
            </Form.Item>
            <UploadInput form={form} field={{ ...field, name: fullFieldName }} view={!!view} />
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'radio':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
            >
              <Radio.Group disabled={field.readOnly || view}>
                {field.options?.map((option) => (
                  <Radio key={option.label as Key} disabled={!!query.view} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'md':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <MdInput field={field} />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'mdx':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              {/*@ts-ignore*/}
              <Editor markdown={field.defaultValue || ''} onChange={(str) => form.setFieldValue(fieldName, str)} />
              <Note note={field.note} />
            </Form.Item>
          </TooltipWrapper>
        );

      case 'switch':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              valuePropName="checked"
              className={`my-2 ${field.className || ''}`}
            >
              <Switch disabled={field.readOnly || view} defaultChecked={field.defaultValue} />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'list':
        return (
          <TooltipWrapper title={field.tooltip}>
            {field.listLabel && <Typography className={'mt-2'}>{field.listLabel}</Typography>}
            <Form.List name={fieldName}>
              {(fields, { add, remove }) => {
                const Container: FC<ListItemContainer> = field.ListItemContainer
                  ? field.ListItemContainer
                  : DefaultListItemContainer;

                return (
                  <>
                    {field.labelContainer && <Typography className={'my-2'}>{field.labelContainer}</Typography>}
                    {fields.map((item, i) => (
                      <Container key={fieldName + i} field={field} index={i} remove={() => remove(item.name)}>
                        <Row gutter={10}>
                          {field?.childFields?.map((childField) => (
                            <Col
                              key={childField.name}
                              span={childField.span || 24 / columnSize}
                              style={childField.colStyle}
                              xs={childField.xs}
                              sm={childField.sm || childField.xs}
                              md={childField.md || childField.sm || childField.xs}
                              lg={childField.lg || childField.md || childField.sm || childField.xs}
                              xl={childField.xl || childField.lg || childField.md || childField.sm || childField.xs}
                              xxl={childField.xxl || childField.lg || childField.md || childField.sm || childField.xs}
                            >
                              <Field
                                onChange={field.onChange}
                                fieldName={[item.name, childField.name]}
                                fullFieldName={[
                                  ...(Array.isArray(fieldName) ? fieldName : [fieldName]),
                                  item.name,
                                  childField.name,
                                ]}
                                field={childField}
                                form={form}
                              />
                            </Col>
                          ))}
                        </Row>
                      </Container>
                    ))}

                    {React.isValidElement(field?.addButton) ? (
                      <div className="inline-block" onClick={() => add()}>
                        {field.addButton}
                      </div>
                    ) : field.addButton ? (
                      <Button type="dashed" onClick={() => add()} className={'px-6'}>
                        {field.addButton}
                      </Button>
                    ) : (
                      <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} className={'px-6'}>
                        {t("Qo'shish")}
                      </Button>
                    )}
                  </>
                );
              }}
            </Form.List>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'password':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <Input.Password
                addonBefore={field.addonBefore}
                addonAfter={field.addonAfter}
                autoComplete={'new-password'}
                disabled={field.readOnly || view}
              />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'number':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <InputNumber
                addonBefore={field.addonBefore}
                addonAfter={field.addonAfter}
                placeholder={field.placeholder}
                css={css`
                  width: 100% !important;
                `}
                min={field.min}
                max={field.max}
                defaultValue={field.defaultValue}
                disabled={field.readOnly || view}
              />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'select':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <Select
                placeholder={t('select')}
                allowClear
                mode={field.mode}
                options={field.options}
                onChange={handleSelectChange}
                dropdownRender={(menu) => (
                  <>
                    {field.showSelectAll && (
                      <>
                        <Space style={{ padding: '8px' }}>
                          <Checkbox
                            indeterminate={selectedValues?.length > 0 && selectedValues?.length < field.options!.length}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            checked={isSelectAllChecked}
                          >
                            {t('Hammasini belgilash')}
                          </Checkbox>
                        </Space>
                        <Divider style={{ margin: '0px' }} />
                      </>
                    )}
                    {menu}
                  </>
                )}
                showSearch
                filterOption={(input, option) =>
                  ((option?.label || '') as string).toLowerCase().includes(input.toLowerCase())
                }
                disabled={field.readOnly || view}
              />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'autocomplete': {
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <AutoComplete onSearch={field.onSearch} options={field.options} disabled={field.readOnly || view} />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );
      }

      case 'textarea':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <TextArea
                rows={field.rows || 4}
                placeholder={field.placeholder || ''}
                disabled={field.readOnly || view}
                autoSize={field.autoSize}
              />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'datepicker':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <DatePicker style={{ minWidth: 150 }} disabled={field.readOnly || view} />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      case 'colorpicker':
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
              valuePropName="value"
              getValueFromEvent={(color) => {
                const { r, g, b } = color.metaColor;
                return rgbToHex(r, g, b);
              }}
            >
              <ColorPicker defaultValue={field.defaultValue} disabled={field.readOnly || view} />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );

      default:
        return (
          <TooltipWrapper title={field.tooltip}>
            <Form.Item
              label={field.label}
              name={fieldName}
              rules={field.rules}
              className={`my-2 ${field.className || ''}`}
              initialValue={field.defaultValue}
            >
              <Input
                addonBefore={field.addonBefore}
                addonAfter={field.addonAfter}
                type={field.type || 'text'}
                autoComplete={'off'}
                disabled={field.readOnly || view}
                placeholder={field.placeholder}
              />
            </Form.Item>
            <Note note={field.note} />
          </TooltipWrapper>
        );
    }
  },
);

export const TooltipWrapper = ({ title, children }: { title?: string; children: ReactNode }) => {
  if (!title) return <>{children}</>;

  return <Tooltip title={title}>{children}</Tooltip>;
};
