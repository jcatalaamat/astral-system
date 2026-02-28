import type { Metadata } from 'next';
import { {{FONT_IMPORT_NAME}} } from 'next/font/google';
import { Header, Footer } from '@astral/ui';
import { OrganizationSchema } from '@astral/seo';
import { SITE_CONFIG, NAV_LINKS, FOOTER_COLUMNS } from '@/lib/config';
import './globals.css';

const headingFont = {{FONT_IMPORT_NAME}}({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  {{FONT_WEIGHT_CONFIG}}
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={headingFont.variable}>
      <body>
        <OrganizationSchema
          name={SITE_CONFIG.name}
          description={SITE_CONFIG.description}
          url={SITE_CONFIG.url}
          email={SITE_CONFIG.email}
        />
        <Header
          siteName={SITE_CONFIG.name}
          navLinks={NAV_LINKS}
          ctaText="Contact"
          ctaHref="/contact"
        />
        <main>{children}</main>
        <Footer
          siteName={SITE_CONFIG.name}
          tagline={SITE_CONFIG.tagline}
          email={SITE_CONFIG.email}
          columns={FOOTER_COLUMNS}
        />
      </body>
    </html>
  );
}
