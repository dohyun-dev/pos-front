/**
 * 배열을 지정된 크기의 청크로 나눕니다.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * 배열의 두 요소의 위치를 교환합니다.
 */
export function swap<T>(array: T[], index1: number, index2: number): T[] {
  const newArray = [...array];
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
  return newArray;
}

/**
 * 배열의 요소를 위로 이동합니다.
 */
export function moveUp<T>(array: T[], index: number): T[] {
  if (index <= 0) return array;
  return swap(array, index, index - 1);
}

/**
 * 배열의 요소를 아래로 이동합니다.
 */
export function moveDown<T>(array: T[], index: number): T[] {
  if (index >= array.length - 1) return array;
  return swap(array, index, index + 1);
}

/**
 * 배열을 정렬합니다.
 */
export function sortByOrder<T extends { order?: number; position?: number }>(
  array: T[]
): T[] {
  return [...array].sort((a, b) => {
    const aOrder = a.order ?? a.position ?? 0;
    const bOrder = b.order ?? b.position ?? 0;
    return aOrder - bOrder;
  });
}
