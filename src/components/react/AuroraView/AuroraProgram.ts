import { Program, Color, type OGLRenderingContext, Mesh, Triangle } from "ogl";

import { FRAGMENT_SHADER, VERTEX_SHADER } from "./auroraShaders";

export interface Size {
  width: number;
  height: number;
}

export interface AuroraShaderProgramOptions {
  colorStops: string[];
  amplitude: number;
  blend: number;
  resolution: Size;
  speed: number;
}

export class AuroraShaderProgram extends Program {
  #speed: number;

  public constructor(
    context: OGLRenderingContext,
    options: AuroraShaderProgramOptions
  ) {
    super(context, {
      vertex: VERTEX_SHADER,
      fragment: FRAGMENT_SHADER,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: options.amplitude },
        uColorStops: {
          value: options.colorStops.map((hex) => {
            const c = new Color(hex);
            return [c.r, c.g, c.b];
          }),
        },
        uResolution: {
          value: [options.resolution.width, options.resolution.height],
        },
        uBlend: { value: options.blend },
      },
    });
    this.#speed = options.speed;
  }
  public updateTime(time: number) {
    this.uniforms.uTime.value = (time * this.#speed) / 1000;
  }

  public updateSize(size: Size) {
    this.uniforms.uResolution.value = [size.width, size.height];
  }

  public createMesh(): Mesh {
    const geometry = new Triangle(this.gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    return new Mesh(this.gl, { geometry, program: this });
  }
}
