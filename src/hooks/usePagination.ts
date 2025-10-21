import { useState, useMemo, useCallback } from 'react';
import { chunk } from '@/lib/array-utils';

interface UsePaginationOptions {
  pageSize: number;
  initialPage?: number;
}

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  items: T[];
  canGoPrev: boolean;
  canGoNext: boolean;
  goToPage: (page: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  goToFirst: () => void;
  goToLast: () => void;
}

export function usePagination<T>(
  data: T[],
  options: UsePaginationOptions
): UsePaginationResult<T> {
  const { pageSize, initialPage = 0 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 페이지 청크 계산
  const pages = useMemo(() => chunk(data, pageSize), [data, pageSize]);
  
  const totalPages = pages.length;
  const items = pages[currentPage] || [];
  const canGoPrev = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 0 && page < totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [canGoPrev]);

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [canGoNext]);

  const goToFirst = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentPage(totalPages - 1);
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    items,
    canGoPrev,
    canGoNext,
    goToPage,
    goToPrev,
    goToNext,
    goToFirst,
    goToLast,
  };
}
