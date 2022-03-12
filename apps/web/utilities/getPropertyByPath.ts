/**
 * Given an object and a path, return the value of the property at that path
 * @param {Record<string, any> | undefined} object - The object to search in.
 * @param {string | string[]} path - The path to the property you want to get.
 * @returns The value of the property at the end of the path.
 */
export function getPropertyByPath(
  object: Record<string, any> | undefined,
  path: string | string[],
): any {
  const parts = Array.isArray(path) ? path : path.split('.');

  return parts.reduce((current, key) => current && current[key], object);
}
