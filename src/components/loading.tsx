import { Spin } from 'antd';
import { AiOutlineLoading3Quarters as LoadingOutlined } from 'react-icons/ai';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

function Loading({ fullscreen = false }: { fullscreen?: boolean }) {
  return <Spin indicator={antIcon} className={'animate-spin'} fullscreen={fullscreen} />;
}

export const SpinLoading = () => (
  <div className={'grid h-screen place-items-center'}>
    <Spin />
  </div>
);

export default Loading;
