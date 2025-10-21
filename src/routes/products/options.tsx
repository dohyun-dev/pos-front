import { createFileRoute } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { OptionGroupDialog } from '@/components/products/OptionGroupDialog';
import { DeleteOptionGroupDialog } from '@/components/products/DeleteOptionGroupDialog';
import { OptionGroupOrderDialog } from '@/components/products/OptionGroupOrderDialog';
import { useOptionGroups, useUpdateOptionGroupKioskMutation } from '@/api/options-groups';

export const Route = createFileRoute('/products/options')({
  component: ProductOptionsPage,
});

function ProductOptionsPage() {
  // Fetch option groups from API
  const { data: optionGroups = [], isLoading } = useOptionGroups();
  const updateKioskMutation = useUpdateOptionGroupKioskMutation();

  const handleKioskToggle = async (groupId: string, currentValue: boolean) => {
    try {
      await updateKioskMutation.mutateAsync({
        id: groupId,
        data: { kioskEnabled: !currentValue },
      });
    } catch (error) {
      console.error('Failed to update kiosk setting:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">옵션 그룹 관리</h2>
        <div className="flex items-center gap-2">
          <OptionGroupOrderDialog
            optionGroups={optionGroups.map((g) => ({
              id: g.id,
              title: g.title || g.name || '',
              order: g.order || g.displayOrder || 0,
            }))}
          >
            <Button variant="outline" size="sm">
              순서 편집
            </Button>
          </OptionGroupOrderDialog>
          <OptionGroupDialog mode="create" isKioskEnabled={false}>
            <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              옵션 그룹 추가
            </Button>
          </OptionGroupDialog>
        </div>
      </div>

      {/* Option Groups List */}
      <div className="space-y-4">
        {optionGroups.map((group) => {
          const title = group.title || group.name || '';
          const choices = group.choices || [];
          const isRequired = group.isRequired || group.minChoices > 0;
          const kioskEnabled = group.kioskEnabled || false;
          const minChoices = group.minChoices || 0;
          const maxChoices = group.maxChoices || group.selectableOptionCount || 1;

          return (
            <div key={group.id} className="bg-white rounded-lg border">
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{title}</h3>
                      {isRequired && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded">
                          필수
                        </span>
                      )}
                      {kioskEnabled && (
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                          키오스크
                        </span>
                      )}
                    </div>
                    {group.titleI18n?.languages?.['en-US'] && (
                      <p className="text-sm text-gray-500 mt-1">
                        {group.titleI18n.languages['en-US']}
                      </p>
                    )}
                    {group.description && (
                      <p className="text-sm text-gray-500 mt-1">
                        {group.description}
                      </p>
                    )}
                    <p className="text-sm text-gray-500 mt-2">
                      최소 {minChoices}개 ~ 최대 {maxChoices}개 선택
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">키오스크 노출</span>
                      <Switch
                        checked={kioskEnabled}
                        onCheckedChange={() => handleKioskToggle(group.id, kioskEnabled)}
                        disabled={updateKioskMutation.isPending}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <OptionGroupDialog
                        mode="editOrDelete"
                        item={{
                          id: group.id,
                          title,
                          titleI18n: group.titleI18n,
                          choices: choices.map((c) => ({
                            id: c.id,
                            title: c.title,
                            priceValue: c.priceValue,
                            order: c.order,
                            state: c.state,
                          })),
                          isRequired,
                          minChoices,
                          maxChoices,
                          defaultChoices: group.defaultChoices || [],
                          order: group.order || group.displayOrder || 0,
                          kioskEnabled,
                        }}
                      >
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
              </div>
              <div className="divide-y">
                {choices.map((choice) => (
                  <div
                    key={choice.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{choice.title}</span>
                      {choice.state === 'SOLD_OUT' && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          품절
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {choice.priceValue > 0
                        ? `+${choice.priceValue.toLocaleString()}원`
                        : '기본'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {optionGroups.length === 0 && (
          <div className="bg-white rounded-lg border p-12 text-center text-gray-500">
            <p className="text-lg font-medium">등록된 옵션 그룹이 없습니다</p>
            <p className="text-sm mt-2">새 옵션 그룹을 추가하여 시작하세요</p>
          </div>
        )}
      </div>
    </div>
  );
}
