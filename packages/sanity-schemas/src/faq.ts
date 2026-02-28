import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Ayahuasca Retreats', value: 'ayahuasca' },
          { title: 'Private Homestay', value: 'homestay' },
          { title: 'Integration Therapy', value: 'integration' },
          { title: '21-Day Detox', value: 'detox' },
          { title: 'Safety & Medical', value: 'safety' },
          { title: 'Travel & Logistics', value: 'travel' },
          { title: 'Pricing & Payment', value: 'pricing' },
          { title: 'School / Training', value: 'school' },
          { title: 'Courses', value: 'courses' },
          { title: 'Certification', value: 'certification' },
          { title: 'Community', value: 'community' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within category',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
    },
    prepare({ title, subtitle }) {
      const categoryLabels: Record<string, string> = {
        general: 'General',
        ayahuasca: 'Ayahuasca',
        homestay: 'Homestay',
        integration: 'Integration',
        detox: 'Detox',
        safety: 'Safety',
        travel: 'Travel',
        pricing: 'Pricing',
        school: 'School',
        courses: 'Courses',
        certification: 'Certification',
        community: 'Community',
      };
      return {
        title: title?.length > 60 ? `${title.slice(0, 60)}...` : title,
        subtitle: categoryLabels[subtitle] || subtitle,
      };
    },
  },
  orderings: [
    {
      title: 'Category, then Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
});
