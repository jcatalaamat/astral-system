'use client';

import { motion } from 'framer-motion';
import { Button } from '../primitives/Button';
import { cn } from '../utils/cn';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  variant?: 'default' | 'primary' | 'secondary' | 'image';
  backgroundImage?: string;
  className?: string;
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'default',
  backgroundImage,
  className,
}: CTASectionProps) {
  const bgStyles = {
    default: 'bg-[var(--muted)]',
    primary: 'bg-[var(--primary)] text-white',
    secondary: 'bg-[var(--secondary)] text-white',
    image: 'relative bg-cover bg-center',
  };

  const isLight = variant === 'default';

  return (
    <section
      className={cn('section', bgStyles[variant], className)}
      style={variant === 'image' && backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {variant === 'image' && (
        <div className="absolute inset-0 bg-[var(--primary)]/80" />
      )}

      <div className={cn('container relative z-10', variant === 'image' && 'text-white')}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className={cn('mb-4', !isLight && 'text-white')}>
            {title}
          </h2>

          {description && (
            <p className={cn(
              'text-lg mb-8 mx-auto',
              isLight ? 'text-[var(--foreground-muted)]' : 'text-white/90'
            )}>
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={primaryCTA.href}
              variant={isLight ? 'primary' : 'accent'}
              size="lg"
            >
              {primaryCTA.label}
            </Button>

            {secondaryCTA && (
              <Button
                href={secondaryCTA.href}
                variant={isLight ? 'outline' : 'ghost'}
                size="lg"
                className={!isLight ? 'text-white border-white/30 hover:bg-white/10' : ''}
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
