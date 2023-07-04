import { FrameAnimation } from "@utils/animation";

interface PlayOptions {
  speed: number;
  onIncrement: (value: number) => void;
  targetValue: number;
  startValue: number;
}

export function play({
  speed,
  onIncrement,
  targetValue,
  startValue,
}: PlayOptions): () => void {
  let currentValue = startValue;

  const animation = new FrameAnimation(({ timeDelta }) => {
    if (currentValue < targetValue) {
      currentValue = Math.min(currentValue + timeDelta * speed, targetValue);
      onIncrement(currentValue);
    }
  });

  animation.start();

  return () => {
    animation.stop();
  };
}
