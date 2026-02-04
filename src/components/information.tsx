import { Col, Row } from 'antd';
import { isString } from 'lodash';
import { observer } from 'mobx-react';
import { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';

interface FormField {
  label?: string;
  defaultValue?: any;
  span?: number;
  colStyle?: CSSProperties;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

const Information = observer(
  ({
    fields,
    columnSize = 1,
    xsColumnSize = 1,
    mdColumnSize,
    smColumnSize,
    lgColumnSize,
    xlColumnSize,
    xxlColumnSize,
  }: {
    fields: FormField[];
    columnSize?: number;
    mdColumnSize?: number;
    xsColumnSize?: number;
    smColumnSize?: number;
    lgColumnSize?: number;
    xlColumnSize?: number;
    xxlColumnSize?: number;
  }) => {
    const { t } = useTranslation();

    return (
      <Row gutter={[16, 16]}>
        {fields.map((field, index) => (
          <Col
            key={isString(field.label) ? field.label : index}
            span={field.span || 24 / columnSize}
            style={field.colStyle}
            xs={field.xs || (xsColumnSize ? 24 / xsColumnSize : undefined)}
            sm={field.sm || (smColumnSize ? 24 / smColumnSize : undefined)}
            md={field.md || (mdColumnSize ? 24 / mdColumnSize : undefined)}
            lg={field.lg || (lgColumnSize ? 24 / lgColumnSize : undefined)}
            xl={field.xl || (xlColumnSize ? 24 / xlColumnSize : undefined)}
            xxl={field.xxl || (xxlColumnSize ? 24 / xxlColumnSize : undefined)}
          >
            <div className="information-field flex flex-col gap-2">
              <span className="information-label font-light text-gray2">{t(field.label || 'не заполнено')}</span>
              <span className="information-value text-gray4">{field.defaultValue || t('не заполнено')}</span>
            </div>
          </Col>
        ))}
      </Row>
    );
  },
);

export default Information;
