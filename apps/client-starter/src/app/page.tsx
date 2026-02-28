import { Hero, CTASection, TestimonialCarousel, NewsletterSignup } from '@astral/ui';
import { SITE_CONFIG } from '@/lib/config';

export default function HomePage() {
  return (
    <>
      <Hero
        title={`Welcome to ${SITE_CONFIG.name}`}
        subtitle={SITE_CONFIG.tagline}
        description="Your journey starts here."
        primaryCta={{ text: 'Get Started', href: '/contact' }}
        secondaryCta={{ text: 'Learn More', href: '/about' }}
        height="full"
      />

      <CTASection
        title="Ready to Get Started?"
        description="Reach out to learn more about how we can work together."
        primaryCTA={{ label: 'Contact Us', href: '/contact' }}
        variant="primary"
      />

      <NewsletterSignup
        title="Stay in the Loop"
        description="Join our community for updates and insights."
      />
    </>
  );
}
