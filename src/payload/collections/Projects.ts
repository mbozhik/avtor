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
    {
      name: 'tags',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'mode',
          type: 'relationship',
          relationTo: 'tags',
          filterOptions: {type: {equals: 'mode'}},
          required: true,
        },
        {
          name: 'format',
          type: 'relationship',
          relationTo: 'tags',
          filterOptions: {type: {equals: 'format'}},
          required: true,
        },
        {
          name: 'genre',
          type: 'relationship',
          relationTo: 'tags',
          filterOptions: {type: {equals: 'genre'}},
          hasMany: true,
          required: true,
        },
        {
          name: 'audience',
          type: 'relationship',
          relationTo: 'tags',
          filterOptions: {type: {equals: 'audience'}},
          hasMany: true,
          required: true,
        },
      ],
    },
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
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        components: {
          Field: {clientProps: {source: 'title'}, exportName: 'SlugField', path: '/src/payload/ui/slug-field.tsx'},
        },
      },
    },
    {
      name: 'details',
      type: 'group',
      required: true,
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
      required: true,
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
