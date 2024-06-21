interface SliderChangeEvent {
  target: HTMLElement;
  relativeValue: number;
  nativeEvent: MouseEvent;
}

interface SliderObserver {
  onStart: () => void;
  onChange: (event: SliderChangeEvent) => void;
  onEnd: () => void;
}

function getChangeEvent(
  element: HTMLElement,
  mouseEvent: MouseEvent
): SliderChangeEvent {
  const { clientX } = mouseEvent;
  const { left, width } = element.getBoundingClientRect();

  return {
    target: element,
    relativeValue: (clientX - left) / width,
    nativeEvent: mouseEvent
  };
}

const preventDefault = (event: TouchEvent): void => {
  event.preventDefault();
};

export function subscribeToSlider(
  element: HTMLElement,
  observer: SliderObserver
): () => void {
  const handleMouseMove = (mouseEvent: MouseEvent): void => {
    mouseEvent.preventDefault();
    observer.onChange(getChangeEvent(element, mouseEvent));
  };

  const handleMouseUp = (): void => {
    observer.onEnd();
    document.body.removeEventListener('pointermove', handleMouseMove);
  };

  const handleMouseDown = (mouseEvent: MouseEvent): void => {
    // Отменяем выделение
    mouseEvent.preventDefault();

    observer.onStart();
    observer.onChange(getChangeEvent(element, mouseEvent));

    document.body.addEventListener('pointermove', handleMouseMove);
    document.body.addEventListener('touchmove', preventDefault, {
      passive: false
    });
    document.body.addEventListener('pointerup', handleMouseUp, { once: true });
  };

  element.addEventListener('pointerdown', handleMouseDown, { passive: false });

  return () => {
    element.removeEventListener('pointerdown', handleMouseDown);
    document.body.removeEventListener('pointermove', handleMouseMove);
    document.body.removeEventListener('touchmove', preventDefault);
  };
}
