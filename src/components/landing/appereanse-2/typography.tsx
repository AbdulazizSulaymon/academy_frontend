import { Typography } from 'antd';
import { ComponentProps } from 'react';
const { Title: AntTitle, Paragraph: AntParag } = Typography;

export function Title(props: ComponentProps<typeof AntTitle>) {
  return <AntTitle {...props} />;
}
export const Paragraph = (props?: ComponentProps<typeof AntParag>) => {
  return <AntParag {...props} />;
};
