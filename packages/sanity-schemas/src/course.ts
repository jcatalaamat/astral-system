import { defineType, defineField } from 'sanity';

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Reiki Level 1 — Foundation"',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g., "Begin your healing journey"',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'For cards and listings',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  { name: 'blank', type: 'boolean', title: 'Open in new tab', initialValue: false },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    // Classification
    defineField({
      name: 'modality',
      title: 'Modality',
      type: 'reference',
      to: [{ type: 'modality' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level Number',
      type: 'number',
      description: '1-9 for ordering within the modality',
      validation: (Rule) => Rule.min(1).max(9),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Foundation', value: 'foundation' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Master Practitioner', value: 'master' },
          { title: 'Master Teacher', value: 'teacher' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    // Delivery
    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        list: [
          { title: 'In-Person', value: 'in-person' },
          { title: 'Online', value: 'online' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'formatNote',
      title: 'Format Note',
      type: 'string',
      description: 'e.g., "Attunement requires in-person attendance"',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 days", "6 weeks", "Self-paced"',
    }),
    defineField({
      name: 'totalHours',
      title: 'Total Hours',
      type: 'number',
      description: 'Estimated completion hours',
    }),

    // Pricing
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'earlyBirdPrice',
      title: 'Early Bird Price (USD)',
      type: 'number',
    }),
    defineField({
      name: 'depositAmount',
      title: 'Deposit Amount (USD)',
      type: 'number',
    }),
    defineField({
      name: 'paymentPlans',
      title: 'Payment Plans Available',
      type: 'boolean',
      initialValue: false,
    }),

    // Curriculum
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'module',
          title: 'Module',
          fields: [
            { name: 'title', type: 'string', title: 'Module Title', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'text', title: 'Module Description', rows: 2 },
            {
              name: 'lessons',
              type: 'array',
              title: 'Lessons',
              of: [{ type: 'reference', to: [{ type: 'lesson' }] }],
            },
            { name: 'duration', type: 'string', title: 'Duration', description: 'e.g., "2 hours"' },
          ],
          preview: {
            select: {
              title: 'title',
              lessons: 'lessons',
            },
            prepare({ title, lessons }) {
              return {
                title,
                subtitle: `${lessons?.length || 0} lessons`,
              };
            },
          },
        },
      ],
    }),

    // Prerequisites
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'course' }] }],
      description: 'Courses that must be completed before this one',
    }),

    // Outcomes
    defineField({
      name: 'outcomes',
      title: 'Learning Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'What students will learn/achieve',
    }),
    defineField({
      name: 'certification',
      title: 'Certification',
      type: 'reference',
      to: [{ type: 'certification' }],
    }),
    defineField({
      name: 'accreditation',
      title: 'Accreditation',
      type: 'string',
      description: 'e.g., "IPHM Accredited"',
    }),

    // Instructor
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),

    // Metadata
    defineField({
      name: 'enrollmentOpen',
      title: 'Enrollment Open',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'maxStudents',
      title: 'Max Students',
      type: 'number',
      description: 'Leave empty for unlimited',
    }),
    defineField({
      name: 'nextStartDate',
      title: 'Next Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on school landing page',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 100,
    }),

    // SEO
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      tier: 'tier',
      level: 'level',
      modality: 'modality.title',
      media: 'featuredImage',
    },
    prepare({ title, tier, level, modality, media }) {
      const tierLabels: Record<string, string> = {
        foundation: 'Foundation',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        master: 'Master Practitioner',
        teacher: 'Master Teacher',
      };
      return {
        title,
        subtitle: `${modality || ''} • Level ${level || '?'} • ${tierLabels[tier] || tier}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Level Order',
      name: 'levelAsc',
      by: [{ field: 'level', direction: 'asc' }],
    },
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
