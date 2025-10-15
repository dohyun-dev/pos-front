import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/products/options')({
  component: ProductOptionsPage,
})

// 임시 옵션 데이터
const mockOptions = [
  { id: 1, name: '샷추가', enabled: true },
  { id: 2, name: '과일추가', enabled: true },
  { id: 3, name: '원두', enabled: true },
  { id: 4, name: '배달/포장/매장', enabled: true },
  { id: 5, name: '플라스틱, 할인', enabled: true },
  { id: 6, name: '간장', enabled: true },
  { id: 7, name: '온도', enabled: true },
  { id: 8, name: '포장추가비용', enabled: true },
  { id: 9, name: '배달', enabled: true },
]

function ProductOptionsPage() {
  const [options, setOptions] = useState(mockOptions)

  const toggleOption = (id: number) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, enabled: !option.enabled } : option
      )
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">옵션</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>옵션명</span>
            <span className="ml-auto">키오스크 노출</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            순서 편집
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            옵션 추가
          </Button>
        </div>
      </div>

      {/* Options List */}
      <div className="bg-white rounded-lg border divide-y">
        {options.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
          >
            <span className="text-base text-gray-900">{option.name}</span>
            <Switch
              checked={option.enabled}
              onCheckedChange={() => toggleOption(option.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty State - 옵션이 없을 때 */}
      {options.length === 0 && (
        <div className="bg-white rounded-lg border p-12">
          <div className="text-center text-gray-500">
            <p className="text-lg font-medium">등록된 옵션이 없습니다</p>
            <p className="text-sm mt-2">새 옵션을 추가하여 시작하세요</p>
          </div>
        </div>
      )}
    </div>
  )
}
