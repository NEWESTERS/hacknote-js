export type ArrayOrSingle<T> = T | Array<T>;

export function mapArrayOrSingle<S, T>(
  arrayOrSingle: ArrayOrSingle<S>,
  callback: (item: S) => T
): T[] {
  return Array.isArray(arrayOrSingle)
    ? arrayOrSingle.map(callback)
    : [callback(arrayOrSingle)];
}
