export function formatDuration(duration: number): string {
  const minutes = Math.round(duration / 60_000);

  return `${minutes} мин.`;
}
