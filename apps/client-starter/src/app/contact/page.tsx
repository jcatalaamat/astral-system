import { PageHero } from '@astral/ui';
import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        description="We'd love to hear from you."
        backgroundImage="/images/hero-contact.jpg"
      />

      <section className="section">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-medium mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-[var(--muted)]" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-[var(--muted)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-lg border border-[var(--muted)]" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-[var(--muted)] resize-y" />
              </div>
              <button type="submit" className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors">
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-[var(--muted)] text-center">
              <p className="text-[var(--foreground-muted)]">
                Or email us at{' '}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--primary)] font-medium">
                  {SITE_CONFIG.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
