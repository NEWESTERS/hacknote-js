interface FrameContext {
  startTime: number;
  currentTime: number;
  timeDelta: number;
}

type OnAnimationFrame = (context: FrameContext) => void;

export class FrameAnimation {
  private _startTime: number | undefined = undefined;

  private _lastAnimationFrameId: number | undefined = undefined;

  private _onAnimationFrame: OnAnimationFrame;

  public constructor(onAnimationFrame: OnAnimationFrame) {
    this._onAnimationFrame = onAnimationFrame;
  }

  public start(): void {
    if (this._startTime) {
      return;
    }

    const startTime = performance.now();
    this._startTime = startTime;

    let previousTime = startTime;

    const onFrame = (time: DOMHighResTimeStamp): void => {
      const timeDelta = time - previousTime;
      previousTime = time;

      this._onAnimationFrame({
        startTime,
        timeDelta,
        currentTime: time
      });

      this._lastAnimationFrameId = requestAnimationFrame(onFrame);
    };

    onFrame(startTime);
  }

  public stop(): void {
    if (this._lastAnimationFrameId) {
      cancelAnimationFrame(this._lastAnimationFrameId);
    }
  }
}
