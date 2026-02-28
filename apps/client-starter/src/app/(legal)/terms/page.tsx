import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Terms of Service',
};

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-[var(--foreground-muted)]">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p>By using {SITE_CONFIG.name}&apos;s website, you agree to these terms of service.</p>
          <h2>Use of Service</h2>
          <p>This website is provided for informational purposes. Content is subject to change without notice.</p>
          <h2>Intellectual Property</h2>
          <p>All content on this site is owned by {SITE_CONFIG.name} and may not be reproduced without permission.</p>
          <h2>Contact</h2>
          <p>Questions? Contact us at <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.</p>
        </div>
      </div>
    </div>
  );
}
