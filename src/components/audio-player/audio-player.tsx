import type { SliderSingleProps } from 'antd';
import { Button, Slider } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';
import { MdPause, MdPlayArrow } from 'react-icons/md';

interface Props {
  url: string;
  type?: string;
  durationProp: number;
}

const AudioPlayer = ({ url, type, durationProp }: Props) => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = url;
    }
  }, [url]);

  // Update duration when the audio is ready
  const handleCanPlay = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsReady(true);
    }
  };

  // Play/Pause toggle function
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  // Update current time of the audio as it plays
  useEffect(() => {
    const updateCurrentTime = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    };

    const audio = audioRef.current;
    audio?.addEventListener('timeupdate', updateCurrentTime);
    return () => {
      audio?.removeEventListener('timeupdate', updateCurrentTime);
    };
  }, []);

  // Seek through the audio
  const handleSeekChange = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (value: any) =>
    `${Math.floor(value / 60)}:${Math.floor(value % 60)
      .toString()
      .padStart(2, '0')}`;

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onCanPlay={handleCanPlay}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={url} type={type} />
        {t('Your browser does not support the audio element.')}
      </audio>

      {/* Play/Pause Button */}
      <div className="my-4 flex items-start gap-3">
        <Button
          type="primary"
          disabled={!isReady}
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          size={'middle'}
          shape="circle"
        >
          {!isReady && !!url ? (
            <CgSpinner size={24} className="animate-spin" />
          ) : isPlaying ? (
            <MdPause size={15} />
          ) : (
            <MdPlayArrow size={15} />
          )}
        </Button>
        <div className={'flex-1'}>
          <Slider
            className={'w-full'}
            value={currentTime}
            max={duration}
            onChange={handleSeekChange}
            tooltip={{ formatter }}
          />
          <div className="flex justify-between text-sm">
            <span>
              {Math.floor(currentTime / 60)}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, '0')}
            </span>
            <span>
              {Math.floor(duration / 60)}:
              {Math.floor(duration % 60)
                .toString()
                .padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
