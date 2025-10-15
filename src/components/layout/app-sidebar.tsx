import { Home, BarChart3, Users, FileText, Package, TrendingUp, CreditCard, Gift, Calendar, HelpCircle, Settings, Bell, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems: MenuItem[] = [
    { icon: Home, label: '주문 홈', href: '/' },
    { icon: FileText, label: '결제 내역', href: '/payments' },
    { icon: BarChart3, label: '매출 리포트', href: '/sales' },
    { icon: Users, label: '시재 관리', href: '/cash' },
    { icon: Package, label: '상품 관리', href: '/products' },
    { icon: TrendingUp, label: '재고 관리', href: '/inventory' },
    { icon: Users, label: '고객·쿠폰·적립', href: '/customers', badge: '메시지 출시' },
    { icon: CreditCard, label: '선불권', href: '/prepaid', badge: '출시' },
    { icon: Gift, label: '키오스크', href: '/kiosk' },
    { icon: Calendar, label: '토스오더', href: '/toss-order', badge: '테이블주문 출시' },
  ];

  const bottomMenuItems: MenuItem[] = [
    { icon: Bell, label: '새소식 알림', href: '/news' },
    { icon: HelpCircle, label: '고객센터 문의하기', href: '/support' },
    { icon: Settings, label: '설정', href: '/settings' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[380px] sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="px-6 py-4 border-b space-y-1">
          <SheetTitle className="text-base font-semibold text-left flex items-center justify-between">
            <span>[토플테스트] 플레이스카페</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Main Menu Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'relative flex flex-col items-center justify-center gap-2 rounded-lg p-4 transition-all duration-150',
                      'border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100'
                    )}
                  >
                    <Icon className="h-6 w-6 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                      {item.label}
                    </span>
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="absolute top-2 right-2 text-[9px] px-1.5 py-0 h-4 font-medium"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>

            <Separator />

            {/* Bottom Menu - Single column */}
            <div className="space-y-1">
              {bottomMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                      'hover:bg-gray-100 active:bg-gray-200'
                    )}
                  >
                    <Icon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t p-4 space-y-3 bg-gray-50/50">
          <div className="flex items-center justify-center">
            <span className="text-xs text-gray-400 font-medium">toss POS</span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={onClose}
          >
            돌아 열기
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
