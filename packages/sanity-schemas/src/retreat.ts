import { defineType, defineField } from 'sanity';

export const retreat = defineType({
  name: 'retreat',
  title: 'Retreat',
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
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'totalSpots',
      title: 'Total Spots',
      type: 'number',
      initialValue: 12,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'spotsRemaining',
      title: 'Spots Remaining',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'earlyBirdPrice',
      title: 'Early Bird Price (USD)',
      type: 'number',
    }),
    defineField({
      name: 'earlyBirdDeadline',
      title: 'Early Bird Deadline',
      type: 'date',
    }),
    defineField({
      name: 'depositAmount',
      title: 'Deposit Amount (USD)',
      type: 'number',
      initialValue: 1000,
    }),
    defineField({
      name: 'isActive',
      title: 'Active (Visible on Site)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured (Show on Homepage)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startDate: 'startDate',
      spotsRemaining: 'spotsRemaining',
      media: 'image',
    },
    prepare({ title, startDate, spotsRemaining, media }) {
      return {
        title,
        subtitle: `${startDate} • ${spotsRemaining} spots left`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Start Date, Newest',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start Date, Oldest',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
});
