import { defineType, defineField } from 'sanity';

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
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
      type: 'text',
      rows: 3,
    }),

    // Content
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'video' },
          { title: 'Text', value: 'text' },
          { title: 'Audio', value: 'audio' },
          { title: 'Mixed', value: 'mixed' },
        ],
        layout: 'radio',
      },
      initialValue: 'video',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Vimeo or YouTube embed URL',
      hidden: ({ parent }) => parent?.contentType === 'text' || parent?.contentType === 'audio',
    }),
    defineField({
      name: 'videoDuration',
      title: 'Video Duration (minutes)',
      type: 'number',
      hidden: ({ parent }) => parent?.contentType === 'text' || parent?.contentType === 'audio',
    }),
    defineField({
      name: 'body',
      title: 'Written Content',
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
          ],
        },
      ],
      hidden: ({ parent }) => parent?.contentType === 'video' || parent?.contentType === 'audio',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
      description: 'URL for audio content (meditation, guided practice)',
      hidden: ({ parent }) => parent?.contentType === 'video' || parent?.contentType === 'text',
    }),

    // Resources
    defineField({
      name: 'resources',
      title: 'Downloadable Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'resource',
          title: 'Resource',
          fields: [
            { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
            { name: 'file', type: 'file', title: 'File' },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Worksheet', value: 'worksheet' },
                  { title: 'Guide', value: 'guide' },
                  { title: 'Audio', value: 'audio' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title', type: 'type' },
            prepare({ title, type }) {
              return { title, subtitle: type };
            },
          },
        },
      ],
    }),

    // Assessment
    defineField({
      name: 'hasAssessment',
      title: 'Has Assessment',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'assessmentQuestions',
      title: 'Assessment Questions',
      type: 'array',
      hidden: ({ parent }) => !parent?.hasAssessment,
      of: [
        {
          type: 'object',
          name: 'assessmentQuestion',
          title: 'Question',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() },
            {
              name: 'options',
              type: 'array',
              title: 'Answer Options',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.min(2).max(5),
            },
            {
              name: 'correctAnswer',
              type: 'number',
              title: 'Correct Answer Index',
              description: '0-based index of the correct option',
            },
          ],
          preview: {
            select: { title: 'question' },
          },
        },
      ],
    }),

    // Meta
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'estimatedMinutes',
      title: 'Estimated Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'isFree',
      title: 'Free Preview',
      type: 'boolean',
      description: 'Allow non-enrolled users to preview this lesson',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      contentType: 'contentType',
      estimatedMinutes: 'estimatedMinutes',
      isFree: 'isFree',
    },
    prepare({ title, contentType, estimatedMinutes, isFree }) {
      const icons: Record<string, string> = {
        video: '🎬',
        text: '📝',
        audio: '🎧',
        mixed: '📦',
      };
      const freeLabel = isFree ? ' (FREE)' : '';
      const duration = estimatedMinutes ? `${estimatedMinutes} min` : '';
      return {
        title: `${icons[contentType] || ''} ${title}${freeLabel}`,
        subtitle: `${contentType} • ${duration}`,
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
