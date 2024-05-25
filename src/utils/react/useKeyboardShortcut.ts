import { useEffect } from "react";
import { useEventCallback } from "./useEventCallback";

interface UseKeyboardShortcutOptions {
  onPress: () => void;
  predicate: (event: KeyboardEvent) => boolean;
  disableOnInput?: boolean;
}

function isInputFocused(): boolean {
  return (
    document.activeElement instanceof HTMLElement &&
    ["input", "select", "textarea"].includes(
      document.activeElement.tagName.toLowerCase()
    )
  );
}

export function useKeyboardShortcut({
  onPress,
  predicate,
  disableOnInput = true,
}: UseKeyboardShortcutOptions): void {
  const handleKeyPress = useEventCallback((event: KeyboardEvent) => {
    if (disableOnInput && isInputFocused()) {
      return;
    }

    if (predicate(event)) {
      event.preventDefault();
      onPress();
    }
  });

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);
}
