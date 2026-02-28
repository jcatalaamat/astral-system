import { defineType, defineField } from 'sanity';

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Reiki Level 1 Practitioner"',
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
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'badgeImage',
      title: 'Badge Image',
      type: 'image',
      description: 'Digital badge/seal for this certification',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What is needed to earn this certification',
    }),
    defineField({
      name: 'accreditedBy',
      title: 'Accredited By',
      type: 'string',
      description: 'e.g., "IPHM — International Practitioners Holistic Medicine"',
    }),
    defineField({
      name: 'validityPeriod',
      title: 'Validity Period',
      type: 'string',
      description: 'e.g., "Lifetime", "2 years"',
      initialValue: 'Lifetime',
    }),
    defineField({
      name: 'renewalProcess',
      title: 'Renewal Process',
      type: 'text',
      rows: 3,
      description: 'How to renew (if not lifetime)',
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
      accreditedBy: 'accreditedBy',
      media: 'badgeImage',
    },
    prepare({ title, accreditedBy, media }) {
      return {
        title,
        subtitle: accreditedBy || 'No accreditation listed',
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
