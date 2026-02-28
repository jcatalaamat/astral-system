interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: string;
  locationCountry?: string;
  venueName?: string;
  organizerName: string;
  organizerUrl: string;
  price: number;
  currency?: string;
  image?: string;
  url?: string;
  attendanceMode?: 'offline' | 'online' | 'mixed';
}

export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  locationCountry = 'US',
  venueName,
  organizerName,
  organizerUrl,
  price,
  currency = 'USD',
  image,
  url,
  attendanceMode = 'offline',
}: EventSchemaProps) {
  const attendanceModeMap = {
    offline: 'https://schema.org/OfflineEventAttendanceMode',
    online: 'https://schema.org/OnlineEventAttendanceMode',
    mixed: 'https://schema.org/MixedEventAttendanceMode',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    description,
    startDate,
    endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: attendanceModeMap[attendanceMode],
    ...(location && {
      location: {
        '@type': 'Place',
        ...(venueName && { name: venueName }),
        address: {
          '@type': 'PostalAddress',
          addressLocality: location,
          addressCountry: locationCountry,
        },
      },
    }),
    ...(image && { image }),
    organizer: {
      '@type': 'Organization',
      name: organizerName,
      url: organizerUrl,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      ...(url && { url }),
      validFrom: new Date().toISOString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
