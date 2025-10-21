/**
 * Toggle value in array with min/max constraints
 * Used for multi-select option groups
 */
export function toggleArrayValue<T>(
  array: T[],
  value: T,
  options: { min?: number; max?: number } = {},
): T[] {
  const { min = 0, max = Number.POSITIVE_INFINITY } = options;

  const exists = array.includes(value);

  if (exists) {
    const newArray = array.filter((item) => item !== value);
    // Don't allow removal if it would go below minimum
    if (newArray.length < min) {
      return array;
    }
    return newArray;
  } else {
    // Don't allow addition if it would exceed maximum
    if (array.length >= max) {
      return array;
    }
    return [...array, value];
  }
}

/**
 * Sort array by property
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc',
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
