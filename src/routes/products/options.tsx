import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { OptionGroupDialog } from '@/components/products/OptionGroupDialog';
import { DeleteOptionGroupDialog } from '@/components/products/DeleteOptionGroupDialog';

export const Route = createFileRoute('/products/options')({
  component: ProductOptionsPage,
});

function ProductOptionsPage() {
  // Mock data for display - 실제로는 useQuery로 가져와야 함
  const mockOptionGroups = [
    {
      id: '1',
      name: '사이즈',
      description: '음료 사이즈 선택',
      isRequired: true,
      selectableOptionCount: 1,
      options: [
        { id: '1', name: 'Small', extraPrice: 0 },
        { id: '2', name: 'Medium', extraPrice: 500 },
        { id: '3', name: 'Large', extraPrice: 1000 },
      ],
    },
    {
      id: '2',
      name: '샷추가',
      description: '에스프레소 샷 추가',
      isRequired: false,
      selectableOptionCount: 2,
      options: [
        { id: '4', name: '1샷', extraPrice: 500 },
        { id: '5', name: '2샷', extraPrice: 1000 },
      ],
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">옵션 그룹 관리</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            순서 편집
          </Button>
          <OptionGroupDialog>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              옵션 그룹 추가
            </Button>
          </OptionGroupDialog>
        </div>
      </div>

      {/* Option Groups List */}
      <div className="space-y-4">
        {mockOptionGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    {group.isRequired && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                        필수
                      </span>
                    )}
                  </div>
                  {group.description && (
                    <p className="text-sm text-gray-500 mt-1">{group.description}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    선택 가능 개수: {group.selectableOptionCount}개
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <OptionGroupDialog optionGroup={group}>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </OptionGroupDialog>
                  <DeleteOptionGroupDialog optionGroupId={group.id}>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </DeleteOptionGroupDialog>
                </div>
              </div>
            </div>
            <div className="divide-y">
              {group.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{option.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {option.extraPrice > 0
                      ? `+${option.extraPrice.toLocaleString()}원`
                      : '기본'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {mockOptionGroups.length === 0 && (
          <div className="bg-white rounded-lg border p-12 text-center text-gray-500">
            <p className="text-lg font-medium">등록된 옵션 그룹이 없습니다</p>
            <p className="text-sm mt-2">새 옵션 그룹을 추가하여 시작하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
