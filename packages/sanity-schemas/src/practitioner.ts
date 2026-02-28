import { defineType, defineField } from 'sanity';

export const practitioner = defineType({
  name: 'practitioner',
  title: 'Practitioner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
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
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'Brief intro for directory cards',
    }),

    // Credentials
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'earnedCertification',
          title: 'Certification',
          fields: [
            {
              name: 'certification',
              type: 'reference',
              title: 'Certification',
              to: [{ type: 'certification' }],
              validation: (Rule) => Rule.required(),
            },
            { name: 'dateEarned', type: 'date', title: 'Date Earned' },
            { name: 'certificateNumber', type: 'string', title: 'Certificate Number' },
          ],
          preview: {
            select: {
              title: 'certification.title',
              date: 'dateEarned',
            },
            prepare({ title, date }) {
              return {
                title: title || 'Untitled',
                subtitle: date || 'No date',
              };
            },
          },
        },
      ],
    }),

    // Services
    defineField({
      name: 'services',
      title: 'Services Offered',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'practitionerService',
          title: 'Service',
          fields: [
            { name: 'title', type: 'string', title: 'Service Title', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'duration', type: 'string', title: 'Duration', description: 'e.g., "60 minutes"' },
            { name: 'price', type: 'number', title: 'Price (USD)' },
            {
              name: 'format',
              type: 'string',
              title: 'Format',
              options: {
                list: [
                  { title: 'In-Person', value: 'in-person' },
                  { title: 'Online', value: 'online' },
                  { title: 'Both', value: 'both' },
                ],
              },
            },
          ],
          preview: {
            select: { title: 'title', price: 'price', duration: 'duration' },
            prepare({ title, price, duration }) {
              return {
                title,
                subtitle: `${duration || ''} ${price ? `• $${price}` : ''}`.trim(),
              };
            },
          },
        },
      ],
    }),

    // Location & Contact
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'city', type: 'string', title: 'City' },
        { name: 'country', type: 'string', title: 'Country' },
        { name: 'timezone', type: 'string', title: 'Timezone' },
      ],
    }),
    defineField({
      name: 'bookingUrl',
      title: 'Booking URL',
      type: 'url',
      description: 'Calendly or similar booking link',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
    }),

    // Directory
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Reiki', value: 'reiki' },
          { title: 'Meditation', value: 'meditation' },
          { title: 'Energy Work', value: 'energy-work' },
          { title: 'Crystal Healing', value: 'crystal-healing' },
          { title: 'Sound Healing', value: 'sound-healing' },
          { title: 'Breathwork', value: 'breathwork' },
          { title: 'Consciousness', value: 'consciousness' },
        ],
      },
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
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
      title: 'name',
      location: 'location.city',
      country: 'location.country',
      media: 'photo',
    },
    prepare({ title, location, country, media }) {
      return {
        title,
        subtitle: [location, country].filter(Boolean).join(', '),
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
