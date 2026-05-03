import { useEffect, useRef, type CSSProperties } from "react";

import { AuroraRenderer } from "./AuroraRenderer";
import { AuroraShaderProgram } from "./AuroraProgram";

export interface AuroraViewProps {
  className?: string;
  style?: CSSProperties;
  colorStops?: string[];
  amplitude?: number;
  blend?: number;
  speed?: number;
}

const DEFAULT_COLOR_STOPS = ["#ffd865", "#75dbe7", "#ff6287"];

export const AuroraView = ({
  className,
  style,
  colorStops = DEFAULT_COLOR_STOPS,
  blend = 1,
  speed = 0.5,
  amplitude = 1.0,
}: AuroraViewProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const width = element.offsetWidth;
    const height = element.offsetHeight;

    const renderer = new AuroraRenderer();

    renderer.setSize(width, height);

    const program = new AuroraShaderProgram(renderer.gl, {
      amplitude,
      colorStops,
      blend,
      speed,
      resolution: {
        width,
        height,
      },
    });

    const mesh = program.createMesh();

    const updateSize = () => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;

      renderer.setSize(width, height);
      program.updateSize({ width, height });
    };

    window.addEventListener("resize", updateSize);

    let animateId = requestAnimationFrame(function update(time: number) {
      program.updateTime(time);
      renderer.render({ scene: mesh });
      animateId = requestAnimationFrame(update);
    });

    element.appendChild(renderer.gl.canvas);

    return () => {
      cancelAnimationFrame(animateId);
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      element.removeChild(renderer.gl.canvas);
      window.addEventListener("resize", updateSize);
    };
  }, [amplitude, colorStops, blend, speed]);

  return <div ref={ref} className={className} style={style} />;
};
