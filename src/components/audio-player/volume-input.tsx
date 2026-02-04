interface VolumeInputProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}
export default function VolumeInput(props: VolumeInputProps) {
  const { volume, onVolumeChange } = props;
  return (
    <input
      aria-label="volume"
      name="volume"
      type="range"
      min={0}
      step={0.05}
      max={1}
      value={volume}
      className="m-0 h-2 w-[70px] cursor-pointer appearance-none rounded-full bg-gray-700 accent-cyan-600"
      onChange={(e) => {
        onVolumeChange(e.currentTarget.valueAsNumber);
      }}
    />
  );
}
