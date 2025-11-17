import type {CollectionConfig} from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Вид',
          value: 'mode',
        },
        {
          label: 'Формат',
          value: 'format',
        },
        {
          label: 'Жанр',
          value: 'genre',
        },
        {
          label: 'Аудитория',
          value: 'audience',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        components: {
          Field: {clientProps: {source: 'name'}, exportName: 'SlugField', path: '/src/payload/ui/slug-field.tsx'},
        },
      },
    },
  ],
}
