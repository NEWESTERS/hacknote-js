export function formatDuration(duration: number): string {
  const minutes = Math.round(duration / 60000);

  return `${minutes} мин.`;
}
