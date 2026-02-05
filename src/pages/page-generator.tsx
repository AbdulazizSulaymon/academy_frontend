import { Box } from '@components/box';
import Code from '@components/code';
import { AutoForm } from '@components/form/auto-form';
import { Title } from '@components/title';
import { App, Button, Col, Flex, Form, Input, Menu, Row, Typography, Tag, Modal } from 'antd';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useLocalStorageState } from 'ahooks';
import NoSsr from '@components/no-ssr';
import { useNotification } from '@hooks/use-notification';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useLocationParams } from '@hooks/use-location-params';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ApiProvider, useApi } from '@src/api';
import { ReactQueryProvider } from '@src/hocs/react-query';
import { SegmentedTab } from '@components/tab';
import { join } from '@fireflysemantics/join';
import { MyDrawer } from '@components/my-drawer';
import VirtualTable, { numericColumnRCTable } from '@components/table/virtual-table';
import { pagesQueryKey, useCreateListPages, usePages, useUpdateListPages } from '@src/queries/models/pages';
import { getCreateSecondaryOptions, getUpdateSecondaryOptions } from '@utils/util';
import axios from 'axios';
import AntdProvider from '@src/hocs/antd-provider';
import { GoMoon, GoSun } from 'react-icons/go';
import { useMyTheme } from '@hooks/use-my-theme';

type ModelForm = {
  plural: string;
  singular: string;
  model: string;
  add?: boolean;
  edit?: boolean;
  remove?: boolean;
  view?: boolean;
  hidePagination?: boolean;
  reload?: boolean;
};
type Column = { field: string; fieldType: string };
type FormsState = {
  formData: ModelForm;
  formColumnsData: Record<string, any>;
  formFieldsData: Record<string, any>;
  formNamesData: Record<string, any>;
};

const toUpperCase = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

function toKebabCase(str: string) {
  return str.replace(/([a-z0–9])([A-Z])/g, '$1-$2').toLowerCase();
}

function pluralize(word: string): string {
  const irregularPlurals: Record<string, string> = {
    child: 'Children',
    person: 'People',
    man: 'Men',
    woman: 'Women',
    tooth: 'Teeth',
    foot: 'Feet',
    mouse: 'Mice',
    goose: 'Geese',
  };

  const unchangingPlurals = ['sheep', 'fish', 'deer', 'species', 'series'];

  if (unchangingPlurals.includes(word.toLowerCase())) {
    return word;
  }

  if (irregularPlurals[word.toLowerCase()]) {
    return irregularPlurals[word.toLowerCase()];
  }

  if (word.endsWith('y') && !/[aeiou]y$/i.test(word)) {
    return word.slice(0, -1) + 'ies';
  }

  if (
    word.endsWith('o') ||
    word.endsWith('ch') ||
    word.endsWith('sh') ||
    word.endsWith('x') ||
    word.endsWith('s') ||
    word.endsWith('z')
  ) {
    return word + 'es';
  }

  return word + 's';
}

function splitPrismaModels(schema: string): string[] {
  return schema
    .split(/(?=model\s+\w+\s+\{)/g) // "model" kalit so‘zi bo‘yicha bo‘lish
    .map((model) => model.trim()) // Bo‘sh joylarni olib tashlash
    .filter((model) => model.length > 0); // Bo‘sh bo‘laklarni olib tashlash
}

function getModelName(modelText: string): string | null {
  const match = modelText.match(/^model\s+(\w+)/);
  return match ? match[1] : null;
}

const getColumns = (modelString: string): Column[] => {
  // Model qatorlarini olish
  const lines = modelString.split('\n');

  // Har bir maydon uchun `columns` obyektlari yaratamiz, kerakmaslarini filterlaymiz
  const columns = lines
    .slice(1) // Birinchi `model` qatorini tashlab ketamiz
    .filter((line) => line.trim() && !line.trim().startsWith('}')) // Bo'sh va yopiluvchi qatorlarni olib tashlaymiz
    .map((line) => {
      const [field, fieldType] = line.trim().split(/\s+/); // Maydon nomi va turi
      return { field, fieldType };
    })
    .filter(
      ({ field, fieldType }) =>
        field !== 'id' && field !== 'updatedAt' && !fieldType?.includes('[]') && !field.startsWith('@@'),
    ); // `id` va `[]` turlarini olib tashlaymiz

  return columns;
};

const getFields = (modelString: string): Column[] => {
  // Model qatorlarini olish
  const lines = modelString.split('\n');

  // Har bir maydon uchun `fields` obyektlari yaratamiz
  const fields = lines
    .slice(1) // Birinchi `model` qatorini tashlab ketamiz
    .filter((line) => line.trim() && !line.trim().startsWith('}')) // Bo'sh va yopiluvchi qatorlarni olib tashlaymiz
    .map((line) => {
      const [field, fieldType] = line.trim().split(/\s+/); // Maydon nomi va turi
      return { field, fieldType };
    })
    .filter(
      ({ field, fieldType }) =>
        field !== 'id' &&
        field !== 'createdAt' &&
        field != 'updatedAt' &&
        // !fieldType.includes('[]') &&
        !field.startsWith('@@'),
    );

  return fields;
};

function generateColumnsStringFromPrismaModel(columns: Column[], fieldsNames: Record<string, any>): string {
  const arr = columns
    .map(({ field, fieldType }) => {
      return `{
        title: t('${toUpperCase(fieldsNames[field] || field)}'),
        dataIndex: '${field}',
        key: '${field}',
        ${fieldType === 'DateTime' ? 'render: (value: string) => defaultDateTimeFormat(value)' : ''}
      }`;
    })
    .join(',\n'); // Har bir obyektni vergul bilan ajratib qo'shamiz

  return `const columns = useMemo(() => [
    numericColumn(),
    ${arr}
  ], [t]);`;
}

function generateFieldsStringFromPrismaModel(fields: Column[], fieldsNames: Record<string, any>): string {
  const arr = fields
    .map(({ field, fieldType }) => {
      const label = `t('${toUpperCase(fieldsNames[field] || field)}')`;
      const type = fieldType === 'Boolean' ? "type: 'switch'," : fieldType === 'Int' ? `type: 'number',` : '';
      const rules = fieldType !== 'Boolean' && fieldType.includes('?') ? '' : 'rules: [{ required: true }],';
      return `{
        label: ${label},
        name: '${field}',
        ${type ? `${type}\n` : ''}${rules}
      }`;
    })
    .join(',\n'); // Har bir obyektni vergul bilan ajratib qo'shamiz

  return `const fields = useMemo(() => [\n${arr}\n], [t]);`;
}

const getTableFunctions = (add?: boolean, edit?: boolean, view?: boolean, remove?: boolean) =>
  [add && 'addCallback', edit && 'editCallback', view && 'viewCallback', remove && 'removeCallback, isLoadingRemove']
    .filter((item) => item)
    .join(', ');

const getSourceCode = ({
  plural,
  singular,
  model,
  columns,
  fields,
  fieldsNames,
  add,
  edit,
  remove,
  view,
  hidePagination,
  reload,
}: ModelForm & { columns: Column[]; fields: Column[]; fieldsNames: Record<string, any> }) => {
  const pluralLower = plural[0].toLowerCase() + plural.slice(1);
  const singularLower = singular[0].toLowerCase() + singular.slice(1);
  const pluralKebab = toKebabCase(plural);
  const singularKebab = toKebabCase(singular);

  return `import { NextPageWithLayout } from '@/types';
import { useApi } from '@src/api';
import { Box } from '@components/box';
import { AutoForm } from '@components/form/auto-form';
import { MyDrawer } from '@components/my-drawer';
import { numericColumn } from '@components/table/components';
import Table from '@components/table/table';
import { useCrudModal } from '@hooks/use-crud-modal';
import { useLocationParams } from '@hooks/use-location-params';
import { useTableFunctions } from '@hooks/use-table-functions';
import useLocalizedString from '@hooks/use-transform-string';
import { defaultDateTimeFormat } from '@utils/util';
import { ${pluralLower}QueryKey, use${plural} } from '@src/queries/models/${singularKebab}';
import { Button, Form} from 'antd';
import { observer } from 'mobx-react';
import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AdminLayout } from '@src/widgets/dashboard-layout/layouts';
import { DynamicProviders } from '@hocs/dynamic-providers';

const Page: NextPageWithLayout = observer(() => {
  ${remove ? 'const api = useApi();' : ''}
  const {push} = useLocationParams();
  const { t } = useTranslation();
  const { ${getTableFunctions(add, edit, view, remove)} } = useTableFunctions(${remove ? `api.apis.${singular}` : ''});
  const { isLoading, isError, ${pluralLower}Data } = use${plural}({ orderBy: { } });
  ${generateColumnsStringFromPrismaModel(columns, fieldsNames)}

  return ( 
    <Box> 
      <ItemDrawer />
      <Table
        name={'${pluralLower}'}
        ${reload ? `queryKey={[${pluralLower}QueryKey]}` : ''}
        dataSource={${pluralLower}Data?.data?.data}
        columns={columns}
        size={'small'}
        loading={isLoading}
        error={isError}
        total={${pluralLower}Data?.data?.totalCount}
        hidePagination={${(!hidePagination).toString()}}
        ${add ? 'addCallback={addCallback}' : 'add={false}'}
        ${edit ? 'editCallback={editCallback}' : 'editButton={false}'}
        ${remove ? 'removeCallback={removeCallback}' : 'removeButton={false}'}
        ${view ? 'viewCallback={viewCallback}' : ''}
      />
    </Box>
  );
});

const ItemDrawer = observer(() => {
  const { query, push } = useLocationParams();
  const api = useApi();
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { localizeString } = useLocalizedString();

  const { isLoadingPost, isLoadingUpdate, isLoadingOne, post, update, dataById, onCancel } = useCrudModal({
    form,
    name: ${pluralLower}QueryKey,
    model: api.apis.${singular},
    getOne: () =>
      api.apis.${singular}.findOne({
        where: { id: query.id },
      }),
  });

  const onFinish = async (values: any) => {
    if (query.add) {
      values.isDate = undefined;
      post({ data: { ...values } });
    } else if (query.edit) {
      update({
        data: { ...values },
        where: {
          id: dataById?.data.id,
        },
      });
    }
  };

  useEffect(() => {
    if (query.edit && dataById?.data) form.setFieldsValue(dataById?.data);
  }, [dataById?.data]);

  ${generateFieldsStringFromPrismaModel(fields, fieldsNames)}

  return (
    <MyDrawer
      title={
        query.add
          ? t(\`nimadir qo'shish\`, { n: localizeString('${plural}') })
          : t(\`nimadir o'zgartirish\`, { n: localizeString('${plural}') })
      }
      placement={'right'}
      open={!!query.add || !!query.edit}
      onClose={onCancel}
      width={500}
      extra={
        <Button onClick={() => form.submit()} type="primary" loading={isLoadingPost || isLoadingUpdate}>
          {query.add ? t(\`Qo'shish\`) : t('Saqlash')}
        </Button>
      }
    >
      <AutoForm
        form={form}
        fields={fields}
        onCancel={onCancel}
        onFinish={onFinish}
        isSaveLoading={isLoadingPost || isLoadingUpdate}
        loading={isLoadingOne}
        saveTitle={query.add ? t(\`Qo'shish\`) : t('Saqlash')}
        cancelTitle={t('Bekor qilmoqchimisiz?')}
        hideButtons
      />
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
`;
};

const PageGenerator = observer(() => {
  const { notifySuccess, notifyError } = useNotification();
  const { query, push } = useLocationParams();
  const [form] = Form.useForm();
  const [formColumns] = Form.useForm();
  const [formFields] = Form.useForm();
  const [formNames] = Form.useForm();
  const [sourceCode, setSourceCode] = useState('');
  const [modelFormState, setModelFormState] = useLocalStorageState<string | undefined>('modelForm', {
    defaultValue: '',
  });
  const [modelColumns, setModelColumns] = useState<Column[]>([]);
  const [modelFields, setModelFields] = useState<Column[]>([]);
  const nameSingularText = Form.useWatch('singular', form);
  const modelText = Form.useWatch('model', form);

  const { pagesData, isLoadingPages, isErrorPages } = usePages({});

  const pages = useMemo(() => {
    return pagesData?.data?.data || [];
  }, [pagesData]);

  const pagesOptions = useMemo(() => {
    return (
      pagesData?.data?.data
        ?.map((item: Record<string, any>) => ({
          key: item.id,
          label: item.nameSingular,
        }))
        .sort((a: Record<string, any>, b: Record<string, any>) => a.label.localeCompare(b.label)) || []
    );
  }, [pagesData]);

  const fields = useMemo(
    () => [
      { label: 'Name Singular', name: 'singular', rules: [{ required: true }], md: 12 },
      { label: 'Name Plural', name: 'plural', rules: [{ required: true }], md: 12 },
      {
        label: 'Model',
        name: 'model',
        type: 'textarea',
        autoSize: true,
        className: 'min-h-20',
        rules: [{ required: true }],
      },
    ],
    [],
  );

  const actionFields = useMemo(
    () => [
      { label: 'Add', name: 'add', type: 'checkbox' },
      { label: 'Edit', name: 'edit', type: 'checkbox' },
      { label: 'Delete', name: 'remove', type: 'checkbox' },
      { label: 'View', name: 'view', type: 'checkbox' },
      { label: 'Pagination', name: 'hidePagination', type: 'checkbox' },
      { label: 'Reload', name: 'reload', type: 'checkbox' },
    ],
    [],
  );

  const onFinish = () => {
    const data = form.getFieldsValue();
    const formColumnsData = formColumns.getFieldsValue();
    const formFieldsData = formFields.getFieldsValue();
    const formNamesData = formNames.getFieldsValue();

    console.log('data', {
      data,
      formColumnsData,
      formFieldsData,
    });

    if (!data.model) return;
    if (!data.singular || !data.plural) return;

    console.log(1, formNamesData);
    setSourceCode(
      getSourceCode({
        ...data,
        columns: modelColumns.filter((item) => formColumnsData[item.field]),
        fields: modelFields.filter((item) => formFieldsData[item.field]),
        fieldsNames: formNamesData,
      }),
    );

    setModelFormState(
      JSON.stringify({
        formData: data,
        formColumnsData: formColumns.getFieldsValue(),
        formFieldsData: formFields.getFieldsValue(),
        formNamesData: formNames.getFieldsValue(),
      }),
    );
    notifySuccess('Successfully Generated And Saved');
  };

  useEffect(() => {
    const str = nameSingularText?.trim();
    if (form && str && form.getFieldValue('plural')) {
      form.setFieldValue('plural', pluralize(str));
    }
  }, [nameSingularText]);

  useLayoutEffect(() => {
    const data = form.getFieldsValue();

    if (!modelText) return;
    const columnsArr = getColumns(data.model);
    setModelColumns(columnsArr);

    const fieldsArr = getFields(data.model);
    setModelFields(fieldsArr);
  }, [modelText]);

  useEffect(() => {
    if (modelFormState) {
      const { formData, formColumnsData, formFieldsData, formNamesData } = JSON.parse(modelFormState) as FormsState;
      form.setFieldsValue(formData);
      formColumns.setFieldsValue(formColumnsData);
      formFields.setFieldsValue(formFieldsData);
      formNames.setFieldsValue(formNamesData);

      setSourceCode(
        getSourceCode({
          ...formData,
          columns: modelColumns.filter((item) => formColumnsData[item.field]),
          fields: modelFields.filter((item) => formFieldsData[item.field]),
          fieldsNames: formNamesData,
        }),
      );
    } else {
      form.setFieldsValue({
        add: true,
        edit: true,
        remove: true,
        view: false,
        hidePagination: false,
      });
    }
  }, []);

  const fieldsFormColumns = useMemo(
    () =>
      modelColumns.map(({ field, fieldType }) => ({
        label: `${field} (${fieldType})`,
        name: field,
        type: 'checkbox',
        // md: 12,
      })),
    [modelColumns],
  );

  const fieldsFormFields = useMemo(
    () =>
      modelFields.map(({ field, fieldType }) => ({
        label: `${field} (${fieldType})`,
        name: field,
        type: 'checkbox',
        // md: 12,
      })),
    [modelFields],
  );

  const fieldsNames = useMemo(
    () =>
      modelFields.map(({ field, fieldType }) => ({
        label: `${field.slice(0, 1).toUpperCase()}${field.slice(1)}`,
        name: field,
        md: 3,
      })),
    [modelFields],
  );

  useEffect(() => {
    if (
      fieldsFormColumns.length &&
      fieldsFormColumns.find((item) => formColumns.getFieldValue(item.name) === undefined)
    ) {
      formColumns.setFieldsValue(fieldsFormColumns.reduce((obj, item) => ({ ...obj, [item.name]: true }), {}));
      formFields.setFieldsValue(fieldsFormFields.reduce((obj, item) => ({ ...obj, [item.name]: true }), {}));
    }
  }, [fieldsFormColumns]);

  const sourceCodeLines = useMemo(() => sourceCode.split('\n').length, [sourceCode]);

  const onClick = (e: any) => {
    push({ pageId: e.key }, { update: true });
  };

  useEffect(() => {
    if (query.pageId) {
      const page = pages.find((item: Record<string, any>) => item.id === query.pageId);
      console.log(page);
      if (page) {
        form.setFieldsValue({ singular: page.nameSingular, plural: page.namePlural, model: page.model });
      }
    }
  }, [query.pageId, pages.length]);

  return (
    <>
      <Flex gap={'middle'}>
        <div className={'w-[200px] h-[calc(100vh-120px)] overflow-y-auto'}>
          <Button
            className={'w-full mb-3'}
            type={'dashed'}
            onClick={() => {
              push({ schema: true });
            }}
          >
            Prisma Schema
          </Button>
          <Menu
            onClick={onClick}
            className={'w-full rounded-lg'}
            mode="vertical"
            items={pagesOptions}
            selectedKeys={[query.pageId]}
          />
        </div>
        <div className={'flex-1 h-[calc(100vh-120px)] overflow-y-auto overflow-x-hidden'}>
          <Title>Page Generator</Title>
          <AutoForm className={'mb-4'} form={form} fields={fields} hideButtons />

          {/*<pre>*/}
          {/*  <code>{columns.map((item) => JSON.stringify(item, null, 2))}</code>*/}
          {/*</pre>*/}

          {fieldsNames.length ? (
            <div>
              <Typography.Title level={4}>Fields Names</Typography.Title>
              <AutoForm className={'mb-4'} form={formNames} fields={fieldsNames} hideButtons />
            </div>
          ) : (
            ''
          )}

          <Row gutter={[16, 16]}>
            <Col md={8}>
              <Typography.Title level={4}>Table Columns</Typography.Title>
              <AutoForm
                className={'mb-4'}
                form={formColumns}
                fields={fieldsFormColumns}
                onFinish={() => {}}
                hideButtons
              />
            </Col>
            <Col md={8}>
              <Typography.Title level={4}>Form Fields</Typography.Title>
              <AutoForm
                className={'mb-4'}
                form={formFields}
                fields={fieldsFormFields}
                onFinish={() => {}}
                hideButtons
              />
            </Col>
            <Col md={8}>
              <Typography.Title level={4}>Table Options</Typography.Title>
              <AutoForm className={'mb-4'} form={form} fields={actionFields} onFinish={() => {}} hideButtons />
            </Col>
          </Row>

          <div className={'text-center mt-4 mb-10'}>
            <Button type={'primary'} onClick={() => onFinish()}>
              Generate
            </Button>
          </div>

          {sourceCode && (
            <div>
              <div className={'flex items-center justify-between'}>
                <Title>Source Code ({sourceCodeLines || 0} lines)</Title>
                <Button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(sourceCode);
                      notifySuccess('Source code copied to clipboard!');
                    } catch {
                      notifyError('Failed to copy link');
                    }
                  }}
                  type={'text'}
                >
                  <MdOutlineContentCopy />
                </Button>
              </div>
              <Code code={sourceCode} language={'tsx'} />
            </div>
          )}

          {/*<pre>*/}
          {/*  <code>{sourceCode}</code>*/}
          {/*</pre>*/}
        </div>
      </Flex>
      <PrismaSchemaModal />
    </>
  );
});

const PrismaSchemaModal = () => {
  const { query, push } = useLocationParams();
  const [prismaForm] = Form.useForm();
  const { notifyWarning, notifyInfo } = useNotification();

  const { pagesData, isLoadingPages, isErrorPages } = usePages({});

  const { createListPages, isLoadingCreateListPages } = useCreateListPages(
    {},
    getCreateSecondaryOptions([pagesQueryKey]),
  );
  const { updateListPages, isLoadingUpdateListPages } = useUpdateListPages(
    {},
    getUpdateSecondaryOptions([pagesQueryKey]),
  );

  const prismaFields = useMemo(
    () => [
      {
        label: 'Prisma schema',
        name: 'schema',
        type: 'textarea',
        autoSize: true,
        className: 'min-h-20',
        rules: [{ required: true }],
      },
    ],
    [],
  );

  const onFinishPrisma = (values: Record<string, any>) => {
    const schema = values.schema.trim();
    if (schema) {
      const models = splitPrismaModels(schema);
      const arr = models.map((item) => {
        const modelName = getModelName(item);

        return { data: { model: item, nameSingular: modelName, namePlural: pluralize(modelName || '') } };
      });

      const dataForCreate: Record<string, any>[] = [];
      const dataForUpdate: Record<string, any>[] = [];

      arr.map((item) => {
        const page = pagesData?.data?.data?.find(
          (pageItem: Record<string, any>) => pageItem.nameSingular === item.data.nameSingular,
        );
        if (page && page.model !== item.data.model) dataForUpdate.push({ ...item, where: { id: page.id } });
        else if (!page) dataForCreate.push(item);
      });

      if (dataForCreate.length > 0) createListPages({ data: dataForCreate });
      if (dataForUpdate.length > 0) updateListPages({ data: dataForUpdate });
      if (dataForCreate.length === 0 && dataForUpdate.length === 0) notifyInfo('No Changes');
    } else {
      notifyWarning('Please write schema!');
    }
  };

  const onCancel = () => {
    push({ query: { schema: undefined } }, { update: true });
  };

  return (
    <Modal open={!!query.schema} footer={null} width={1000} title={'Prisma Schema'} onCancel={onCancel}>
      <AutoForm form={prismaForm} fields={prismaFields} onFinish={onFinishPrisma} />
    </Modal>
  );
};

const TranslationTable = () => {
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();
  const { query, domain, push } = useLocationParams();

  const searchText = (query.search || 's').slice(1) as string;
  const langs = useMemo(() => ['uz', 'ru', 'en'], []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['translations', langs],
    queryFn: async () => {
      const translations = await Promise.all(
        langs.map(async (lang) => {
          const res = await api.instance.get(join(domain, `/locales/${lang}/translation.json`));
          return { [lang]: res.data };
        }),
      );

      return Object.assign({}, ...translations);
    },
  });

  const addCallback = useCallback(() => push({ add: true }, { update: true }), [push]);
  const editCallback = useCallback(
    (data: Record<string, any>) => push({ edit: true, id: data.key }, { update: true }),
    [push],
  );

  const { mutate: remove, isPending: isLoadingRemove } = useMutation({
    mutationFn: (data: Record<string, any>) => {
      console.log(data);
      return axios.delete('/api/translation', { params: { key: data.key, languages: langs } });
    },
    onSuccess: () => {
      notifySuccess('Deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
    onError: () => notifyError('An error occurred!'),
  });

  const columns = useMemo(() => {
    if (!data) return [];

    return [
      numericColumnRCTable(),
      {
        Header: 'Key',
        // accessorKey: 'key', // Kalit maydoni
        accessor: (item: Record<string, any>) => item.key,
        width: 300,
      },
      ...langs.map((lang) => ({
        Header: lang.toUpperCase(), // Ustun sarlavhasi (UZ, RU, EN)
        // accessorKey: lang,
        accessor: (item: Record<string, any>) => item[lang],
        width: 340,
      })),
    ];
  }, [data]);

  // const columns = useMemo(() => {
  //   if (!data) return [];
  //
  //   return [
  //     numericColumn(),
  //     { title: 'Key', dataIndex: 'key', key: 'key' },
  //     ...langs.map((lang) => ({
  //       title: lang.toUpperCase(), // Ustun sarlavhasi (UZ, RU, EN)
  //       dataIndex: lang,
  //       key: lang,
  //     })),
  //   ];
  // }, [data]);

  const dataSource = useMemo(() => {
    if (!data) return [];

    const allKeys = Object.keys(data?.[langs[0]] || {}); // Barcha kalitlarni olish

    return allKeys
      .map((key) => ({
        key,
        ...langs.reduce((acc, lang) => {
          const value = data[lang]?.[key] || '';
          // @ts-ignore
          acc[lang] = typeof value === 'string' ? value : <Tag color={'green'}>Object</Tag>; // Agar tarjima yo‘q bo‘lsa, bo‘sh string
          return acc;
        }, {}),
      }))
      .filter(
        (item) => !searchText || item.key.toLowerCase().includes(searchText.toLowerCase()),
        // ||
        // langs.map((lang) => (item[lang] as string)?.toLowerCase().includes(searchText.toLowerCase())),
      );
  }, [data, searchText]);

  const itemData = useMemo(() => {
    if (query.id) return dataSource.find((item: Record<string, any>) => item.key === query.id);
    else return undefined;
  }, [query.id]);

  return (
    <div className={''}>
      <TranslationDrawer data={itemData} />
      <VirtualTable
        name={'Translations'}
        data={dataSource}
        columns={columns}
        search
        loading={isLoading}
        error={isError}
        total={dataSource.length}
        hidePagination
        addCallback={addCallback}
        editCallback={editCallback}
        removeCallback={remove}
        leftSide={<Typography className={'font-bold'}>Translations</Typography>}
        // removeCallback={deleteSubscriptionTransactionFromTable}
      />
    </div>
  );
};

const TranslationDrawer = ({ data }: { data?: Record<string, any> }) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useNotification();
  const { query, domain, push } = useLocationParams();
  const [form] = Form.useForm();

  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: (data: { key: string; translations: Record<string, string> }) =>
      fetch('/api/translation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => {
      notifySuccess('Translations saved successfully.');
      queryClient.invalidateQueries({ queryKey: ['translations'] });
    },
    onError: () => {
      notifyError('An error occurred.');
    },
  });

  const onFinish = (values: any) => {
    mutate({
      key: values.key,
      translations: {
        en: values.en,
        ru: values.ru,
        uz: values.uz,
      },
    });
  };

  const onCancel = () => {
    if (form) form.resetFields();
    push({ edit: undefined, add: undefined, id: undefined }, { update: true });
  };

  useEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [data]);

  return (
    <MyDrawer
      title={`Translation Form`}
      placement={'right'}
      open={!!query.add || !!query.edit}
      onClose={onCancel}
      width={500}
      extra={
        <Button onClick={() => form.submit()} type="primary" loading={isLoading}>
          {query.add ? `Qo'shish` : 'Saqlash'}
        </Button>
      }
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="key" label="Key" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="en" label="English" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="ru" label="Russian" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="uz" label="Uzbek" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </MyDrawer>
  );
};

const Page = observer(() => {
  const { theme, toggleTheme } = useMyTheme();

  return (
    <div className="min-h-screen p-5 bg-fixed bg-cover bg-[url('https://t3.ftcdn.net/jpg/01/30/71/26/360_F_130712609_f9OMF1X81kc6a56r3BPbu6c3EEnkZUl4.jpg')] dark:bg-[url('https://images.pexels.com/photos/6985132/pexels-photo-6985132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] ">
      <Box className={'bg-opacity-30 backdrop-blur'}>
        <Button onClick={toggleTheme} type={'text'}>
          {theme == 'light' ? <GoSun /> : <GoMoon />}
        </Button>
        <SegmentedTab
          queryName={'tab'}
          options={[
            { label: 'Page Generator', value: 'PageGenerator' },
            { label: 'Translation Form', value: 'TranslationForm' },
          ]}
          views={[
            { value: 'PageGenerator', view: <PageGenerator /> },
            { value: 'TranslationForm', view: <TranslationTable /> },
          ]}
        />
      </Box>
    </div>
  );
});

const PageWrapper = () => {
  return (
    <NoSsr>
      <AntdProvider>
        <ApiProvider>
          <ReactQueryProvider>
            <Page />
          </ReactQueryProvider>
        </ApiProvider>
      </AntdProvider>
    </NoSsr>
  );
};

export default PageWrapper;
