export function formatTime(milliseconds: number): string {
  const restMilliseconds = milliseconds % 1000;

  return `${milliseconds - restMilliseconds}.${restMilliseconds}`;
}
