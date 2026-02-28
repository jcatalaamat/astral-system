export const SITE_CONFIG = {
  name: '{{CLIENT_NAME}}',
  tagline: '{{TAGLINE}}',
  description: '{{CLIENT_NAME}} — {{TAGLINE}}',
  url: 'https://{{DOMAIN}}',
  email: '{{EMAIL}}',
  phone: '',
  whatsapp: '',
  instagram: '',
  location: {
    city: '',
    country: '',
  },
};

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Pages',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];
