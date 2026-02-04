import { useEffect, useMemo } from 'react';

export type LottieType = {
  link: any;
  height?: number;
  width?: number;
};

export const Lottie = ({ link, height, width, ...props }: LottieType) => {
  // const ref = useRef(null);
  // const size = useSize(ref);
  // const [loaded, setLoaded] = useState(false);
  const id = useMemo(() => 'id' + (Math.random() + 1).toString(36).substring(7), []);

  useEffect(() => {
    // if (!loaded) return;

    try {
      const player = document.querySelector(`#${id}`);

      // @ts-ignore
      setTimeout(() => player?.load(link), 100);
      // player?.load('/lotties/welcome.json');
      // player?.load('https://lottie.host/c266c5df-0cf7-4a95-b86a-d440da6a6c9c/pXPaQOMsGR.lottie');
    } catch (e) {
      // console.log(e);
    }
  }, [id]);

  console.log(id);

  return (
    <div className={'max-w-full overflow-hidden'}>
      {/*@ts-ignore*/}
      <dotlottie-player
        autoplay
        // controls
        mode="bounce"
        loop
        subframe
        style={{ border: 0, width, height, maxWidth: '100%', display: 'inline-block' }}
        id={id}
      >
        {/*@ts-ignore*/}
      </dotlottie-player>
    </div>
  );
};
