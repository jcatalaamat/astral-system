import { PageHero } from '@astral/ui';

export const metadata = {
  title: 'Blog',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Blog"
        description="Insights, updates, and stories."
        backgroundImage="/images/hero-blog.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="text-center text-[var(--foreground-muted)]">
            <p>Blog posts will appear here once connected to Sanity CMS.</p>
          </div>
        </div>
      </section>
    </>
  );
}
