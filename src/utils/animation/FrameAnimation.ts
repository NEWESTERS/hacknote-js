interface FrameContext {
  startTime: number;
  currentTime: number;
  timeDelta: number;
}

type OnAnimationFrame = (context: FrameContext) => void;

export class FrameAnimation {
  public constructor(private _onAnimationFrame: OnAnimationFrame) {}

  private _startTime: number | undefined = undefined;

  private _lastAnimationFrameId: number | undefined = undefined;

  public start(): void {
    if (this._startTime) {
      console.warn("Cannot start started animation");
      return;
    }

    const startTime = performance.now();
    this._startTime = startTime;

    let prevTime = startTime;

    const onFrame = (time: DOMHighResTimeStamp) => {
      const timeDelta = time - prevTime;
      prevTime = time;

      this._onAnimationFrame({
        startTime,
        timeDelta,
        currentTime: time,
      });

      this._lastAnimationFrameId = requestAnimationFrame(onFrame);
    };

    onFrame(startTime);
  }

  public stop() {
    if (this._lastAnimationFrameId) {
      cancelAnimationFrame(this._lastAnimationFrameId);
    }
  }
}
