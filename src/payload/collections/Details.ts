import type {CollectionConfig} from 'payload'

export const Details: CollectionConfig = {
  slug: 'details',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'option',
  },
  fields: [
    {
      name: 'option',
      type: 'select',
      options: [
        {
          label: 'Поддержка ФК',
          value: 'fk_support',
        },
        {
          label: 'Поддержка МК',
          value: 'mk_support',
        },
        {
          label: 'Поддержка иных институтов поддержки',
          value: 'iip_support',
        },
      ],
      required: true,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      validate: (value: string | string[] | null | undefined) => {
        if (typeof value !== 'string') {
          return 'Значение должно быть строкой'
        }
        if (!/^\d{2}$/.test(value)) {
          return 'Значение должно состоять из двух цифр (00-99)'
        }
        const numValue = parseInt(value, 10)
        if (numValue < 0 || numValue > 99) {
          return 'Значение должно быть от 00 до 99'
        }
        return true
      },
      admin: {
        description: 'Значение от 00 до 99 (всегда две цифры, например: 05, 15, 95)',
      },
    },
  ],
}
