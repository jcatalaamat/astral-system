import { PageHero, TeamSection, CTASection } from '@astral/ui';
import { SITE_CONFIG } from '@/lib/config';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${SITE_CONFIG.name}`}
        description="Learn more about our mission and team."
        backgroundImage="/images/hero-about.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto prose">
            <h2>Our Story</h2>
            <p>Tell your story here. What drives your mission? What makes your approach unique?</p>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Connect?"
        primaryCTA={{ label: 'Get in Touch', href: '/contact' }}
        variant="primary"
      />
    </>
  );
}
