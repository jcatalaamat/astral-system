import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      options: {
        list: [
          { title: 'Ayahuasca Retreat', value: 'ayahuasca' },
          { title: 'Private Homestay', value: 'homestay' },
          { title: 'Integration Therapy', value: 'integration' },
          { title: '21-Day Detox', value: 'detox' },
          { title: 'Course / Training', value: 'course' },
          { title: 'Retreat (School)', value: 'school-retreat' },
          { title: 'Community', value: 'community' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Testimonial URL',
      type: 'url',
      description: 'Optional video testimonial (YouTube or Vimeo)',
    }),
    defineField({
      name: 'relatedCourse',
      title: 'Related Course',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'Link to a specific course (for course testimonials)',
      hidden: ({ parent }) => parent?.service !== 'course',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage carousel',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'service',
      media: 'photo',
    },
    prepare({ title, subtitle, media }) {
      const serviceLabels: Record<string, string> = {
        ayahuasca: 'Ayahuasca Retreat',
        homestay: 'Private Homestay',
        integration: 'Integration Therapy',
        detox: '21-Day Detox',
        course: 'Course / Training',
        'school-retreat': 'Retreat (School)',
        community: 'Community',
      };
      return {
        title,
        subtitle: serviceLabels[subtitle] || subtitle,
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
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});
