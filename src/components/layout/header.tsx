import {Menu} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {useSidebar} from '@/components/ui/sidebar';

export function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 transition-colors"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>

          <Separator orientation="vertical" className="h-8 hidden sm:block" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">
        </div>
      </div>
    </header>
  );
}
