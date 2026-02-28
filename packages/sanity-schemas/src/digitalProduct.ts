import { defineType, defineField } from 'sanity';

export const digitalProduct = defineType({
  name: 'digitalProduct',
  title: 'Digital Product',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Guided Meditation', value: 'meditation' },
          { title: 'Guide / eBook', value: 'guide' },
          { title: 'Toolkit', value: 'toolkit' },
          { title: 'Journal Prompts', value: 'journal' },
          { title: 'Audio Recording', value: 'audio' },
          { title: 'Worksheet', value: 'worksheet' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: '0 for free lead magnets',
      initialValue: 0,
    }),
    defineField({
      name: 'files',
      title: 'Files',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'productFile',
          title: 'File',
          fields: [
            { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
            { name: 'file', type: 'file', title: 'File' },
            {
              name: 'format',
              type: 'string',
              title: 'Format',
              options: {
                list: [
                  { title: 'PDF', value: 'pdf' },
                  { title: 'MP3', value: 'mp3' },
                  { title: 'MP4', value: 'mp4' },
                  { title: 'WAV', value: 'wav' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title', format: 'format' },
            prepare({ title, format }) {
              return { title, subtitle: format };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'relatedCourse',
      title: 'Related Course',
      type: 'reference',
      to: [{ type: 'course' }],
    }),
    defineField({
      name: 'relatedModality',
      title: 'Related Modality',
      type: 'reference',
      to: [{ type: 'modality' }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      productType: 'productType',
      price: 'price',
      media: 'featuredImage',
    },
    prepare({ title, productType, price, media }) {
      const typeLabels: Record<string, string> = {
        meditation: 'Meditation',
        guide: 'Guide',
        toolkit: 'Toolkit',
        journal: 'Journal',
        audio: 'Audio',
        worksheet: 'Worksheet',
      };
      return {
        title,
        subtitle: `${typeLabels[productType] || productType} • ${price === 0 ? 'FREE' : `$${price}`}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
