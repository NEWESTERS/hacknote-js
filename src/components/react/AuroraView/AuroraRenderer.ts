import { Renderer } from "ogl";

export class AuroraRenderer extends Renderer {
  public constructor() {
    super({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.canvas.style.backgroundColor = "transparent";
  }
}
