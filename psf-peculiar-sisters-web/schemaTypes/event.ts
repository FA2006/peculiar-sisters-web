import { defineType, defineField } from 'sanity'

const event = defineType({
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
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Leave empty for recurring weekly events.',
    }),

    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      description: 'For recurring events, e.g. Monday or Every Friday.',
    }),

    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),

    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          { title: 'Onsite', value: 'Onsite' },
          { title: 'Online', value: 'Online' },
          { title: 'Hybrid', value: 'Hybrid' },
          {
            title: 'PSF WhatsApp Platform',
            value: 'PSF WhatsApp platform',
          },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
    }),

    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'registration',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'joinUrl',
      title: 'Join / Registration URL',
      type: 'url',
    }),

    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'speaker' }],
        },
      ],
    }),
  ],
})

export default event