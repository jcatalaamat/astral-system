interface OrganizationSchemaProps {
  name: string;
  description: string;
  url: string;
  logo?: string;
  email?: string;
  address?: {
    locality: string;
    region?: string;
    country: string;
  };
  sameAs?: string[];
}

export function OrganizationSchema({
  name,
  description,
  url,
  logo,
  email,
  address,
  sameAs,
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    description,
    url,
    ...(logo && { logo }),
    ...(email && { email }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: address.locality,
        ...(address.region && { addressRegion: address.region }),
        addressCountry: address.country,
      },
    }),
    ...(sameAs && { sameAs }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
