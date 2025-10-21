import { useRef, useCallback, useLayoutEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import type { ProductCategory } from '@/api/products';

interface CategoryTabsProps {
  categories: ProductCategory[];
  selectedCategoryId?: string;
  onSelectCategoryId?: (id?: string) => void;
  addon?: React.ReactNode;
  className?: string;
  withAll?: boolean;
  isScrollTrigger?: boolean;
}

export function CategoryTabs({
  categories,
  selectedCategoryId,
  onSelectCategoryId,
  addon,
  className,
  withAll = true,
  isScrollTrigger = false,
}: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollToCategory = useCallback((index: number) => {
    const item = itemRefs.current[index];
    if (item && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: item.offsetLeft - 20,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const index = categories.findIndex((cat) => cat.id === selectedCategoryId);
    if (index >= 0) {
      scrollToCategory(index);
    } else {
      scrollRef.current?.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [categories, selectedCategoryId, scrollToCategory]);

  useLayoutEffect(() => {
    if (isScrollTrigger) {
      handleScroll();
    }
  }, [isScrollTrigger, handleScroll]);

  return (
    <div className={`relative flex max-w-full ${className || ''}`}>
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide max-w-full pr-5"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {withAll && (
          <div ref={(el) => (itemRefs.current[0] = el)}>
            <Button
              variant={selectedCategoryId === undefined ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSelectCategoryId?.(undefined)}
              className={
                selectedCategoryId === undefined
                  ? 'bg-gray-800 hover:bg-gray-900'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            >
              전체
            </Button>
          </div>
        )}
        {categories.map((category, index) => (
          <div
            key={category.id}
            ref={(el) => (itemRefs.current[index + (withAll ? 1 : 0)] = el)}
          >
            <Button
              variant={selectedCategoryId === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSelectCategoryId?.(category.id)}
              className={
                selectedCategoryId === category.id
                  ? 'bg-gray-800 hover:bg-gray-900'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            >
              {category.name}
            </Button>
          </div>
        ))}
        <div className="w-11" /> {/* Spacer for fade effect */}
      </div>

      {/* Fade gradient */}
      <div
        className="absolute right-0 top-0 h-full w-[120px] pointer-events-none"
        style={{
          background:
            'linear-gradient(to left, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
        }}
      />

      {addon && <div className="ml-2">{addon}</div>}
    </div>
  );
}
