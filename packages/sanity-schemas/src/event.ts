import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
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
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Workshop', value: 'workshop' },
          { title: 'Webinar', value: 'webinar' },
          { title: 'Circle', value: 'circle' },
          { title: 'Ceremony', value: 'ceremony' },
          { title: 'Masterclass', value: 'masterclass' },
          { title: 'Q&A', value: 'qa' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'timezone',
      title: 'Timezone',
      type: 'string',
      description: 'e.g., "America/Mexico_City", "Europe/Madrid"',
    }),
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
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Physical location (if applicable)',
      hidden: ({ parent }) => parent?.format === 'online',
    }),
    defineField({
      name: 'meetingUrl',
      title: 'Meeting URL',
      type: 'url',
      description: 'Zoom/Meet link (shown after registration)',
      hidden: ({ parent }) => parent?.format === 'in-person',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: '0 for free events',
      initialValue: 0,
    }),
    defineField({
      name: 'maxAttendees',
      title: 'Max Attendees',
      type: 'number',
    }),
    defineField({
      name: 'registrationOpen',
      title: 'Registration Open',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'facilitator',
      title: 'Facilitator',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'relatedCourse',
      title: 'Related Course',
      type: 'reference',
      to: [{ type: 'course' }],
      description: 'Link to a course for upsell',
    }),
    defineField({
      name: 'relatedModality',
      title: 'Related Modality',
      type: 'reference',
      to: [{ type: 'modality' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      eventType: 'eventType',
      date: 'date',
      media: 'featuredImage',
    },
    prepare({ title, eventType, date, media }) {
      const typeLabels: Record<string, string> = {
        workshop: 'Workshop',
        webinar: 'Webinar',
        circle: 'Circle',
        ceremony: 'Ceremony',
        masterclass: 'Masterclass',
        qa: 'Q&A',
      };
      const dateStr = date
        ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : 'TBD';
      return {
        title,
        subtitle: `${typeLabels[eventType] || eventType} • ${dateStr}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date, Upcoming',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
    {
      title: 'Date, Recent',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
