interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  worksFor?: {
    name: string;
    url?: string;
  };
  sameAs?: string[];
}

export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  worksFor,
  sameAs,
}: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    ...(description && { description }),
    ...(image && { image }),
    ...(worksFor && {
      worksFor: {
        '@type': 'Organization',
        name: worksFor.name,
        ...(worksFor.url && { url: worksFor.url }),
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
