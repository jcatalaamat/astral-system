import { defineType, defineField } from 'sanity';

export const modality = defineType({
  name: 'modality',
  title: 'Modality',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., Reiki, Meditation, Energy Work',
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
      description: 'Brief intro for cards (1-2 sentences)',
    }),
    defineField({
      name: 'icon',
      title: 'Icon Image',
      type: 'image',
      description: 'Small icon for the modality',
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
      name: 'color',
      title: 'Accent Color',
      type: 'string',
      description: 'Hex color code, e.g., #2D4A3E',
    }),
    defineField({
      name: 'isProprietary',
      title: 'Proprietary Modality',
      type: 'boolean',
      description: 'Created by the founder (unique IP)',
      initialValue: false,
    }),
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      hidden: ({ parent }) => !parent?.isProprietary,
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
      isProprietary: 'isProprietary',
      media: 'featuredImage',
    },
    prepare({ title, isProprietary, media }) {
      return {
        title,
        subtitle: isProprietary ? 'Proprietary Modality' : 'Modality',
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
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
