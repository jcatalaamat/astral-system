import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container max-w-3xl mx-auto">
        <h1 className="mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-[var(--foreground-muted)]">
          <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          <p>{SITE_CONFIG.name} is committed to protecting your privacy. This policy outlines how we collect, use, and protect your information.</p>
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly, such as your name and email when filling out forms on our site.</p>
          <h2>How We Use Your Information</h2>
          <p>We use the information to respond to your inquiries, send newsletters (if subscribed), and improve our services.</p>
          <h2>Contact</h2>
          <p>Questions about this policy? Contact us at <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.</p>
        </div>
      </div>
    </div>
  );
}
