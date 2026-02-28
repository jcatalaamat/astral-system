interface LocalBusinessSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  address: {
    locality: string;
    region?: string;
    country: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  priceRange?: string;
  openingHours?: {
    days: string[];
    opens: string;
    closes: string;
  };
}

export function LocalBusinessSchema({
  name,
  description,
  url,
  image,
  type = 'HealthAndBeautyBusiness',
  address,
  geo,
  priceRange,
  openingHours,
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...(image && { image }),
    address: {
      '@type': 'PostalAddress',
      addressLocality: address.locality,
      ...(address.region && { addressRegion: address.region }),
      addressCountry: address.country,
    },
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
    ...(priceRange && { priceRange }),
    ...(openingHours && {
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: openingHours.days,
        opens: openingHours.opens,
        closes: openingHours.closes,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
