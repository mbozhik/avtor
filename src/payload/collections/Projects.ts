import type {CollectionConfig} from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // tags -> 3 types –> relation
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        {
          label: 'В реализации',
          value: 'implementation',
        },
        {
          label: 'Свободные сценарии',
          value: 'free_scripts',
        },
      ],
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'details',
      type: 'group',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          admin: {rows: 4},
          required: true,
        },
        {
          name: 'screenwriter',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'roadmap',
      type: 'group',
      fields: [
        {
          name: 'production_date',
          type: 'text',
          required: true,
        },
        {
          name: 'production_budget',
          type: 'text',
        },
        {
          name: 'box_office_fees',
          type: 'text',
        },
      ],
    },
    {
      name: 'report',
      type: 'text',
      admin: {
        description: 'Сведения о проекте (ссылка на ЕАИС)',
      },
    },
    {
      name: 'references',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
  ],
}
