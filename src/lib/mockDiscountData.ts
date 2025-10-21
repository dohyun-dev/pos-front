import { Discount } from '@/api/discounts';

export const mockDiscounts: Discount[] = [
  {
    id: 1,
    title: '오픈 기념 10% 할인',
    type: 'FIXED_PERCENTAGE',
    source: 'POS',
    percentage: 10,
    autoApply: {
      condition: {
        appliedToAll: true,
        diningOptions: ['HERE', 'TOGO', 'DELIVERY', 'PICKUP'],
        schedule: null,
      },
      targets: [],
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: '포장 1000원 할인',
    titleI18n: {
      languages: {
        'en-US': 'Takeout 1000won Discount',
      },
    },
    type: 'FIXED_AMOUNT',
    source: 'POS',
    amountMoney: 1000,
    autoApply: {
      condition: {
        appliedToAll: true,
        diningOptions: ['TOGO'],
        schedule: null,
      },
      targets: [],
    },
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    title: '평일 점심 특가',
    type: 'FIXED_PERCENTAGE',
    source: 'POS',
    percentage: 15,
    autoApply: {
      condition: {
        appliedToAll: false,
        diningOptions: ['HERE', 'TOGO'],
        schedule: {
          dayOfWeeks: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
          timeRange: {
            start: '11:00',
            end: '14:00',
          },
          dateRange: null,
        },
      },
      targets: [
        { targetType: 'CATEGORY', targetId: 1 },
        { targetType: 'ITEM', targetId: 2 },
      ],
    },
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: 4,
    title: '주말 할인',
    type: 'FIXED_AMOUNT',
    source: 'POS',
    amountMoney: 2000,
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
  },
  {
    id: 5,
    title: '신규 고객 할인',
    titleI18n: {
      languages: {
        'en-US': 'New Customer Discount',
      },
    },
    type: 'FIXED_PERCENTAGE',
    source: 'POS',
    percentage: 20,
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
  },
];
