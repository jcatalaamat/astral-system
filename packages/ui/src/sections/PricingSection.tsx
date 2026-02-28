'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../utils/cn';
import { Button } from '../primitives/Button';
import { Card } from '../primitives/Card';
import { Badge } from '../primitives/Badge';

interface PricingTier {
  name: string;
  price: number;
  description?: string;
  features: string[];
  popular?: boolean;
  href: string;
  ctaText?: string;
}

interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  className?: string;
}

export function PricingSection({
  title = 'Investment',
  subtitle = 'Choose your path',
  tiers,
  className,
}: PricingSectionProps) {
  return (
    <section className={cn('section bg-[var(--background)]', className)}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {subtitle && (
            <p className="text-[var(--secondary)] font-medium tracking-wide uppercase text-sm mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-[var(--foreground)]">{title}</h2>
        </div>

        <div className={cn(
          'grid gap-8 max-w-5xl mx-auto',
          tiers.length === 2 && 'md:grid-cols-2',
          tiers.length === 3 && 'md:grid-cols-3',
          tiers.length > 3 && 'md:grid-cols-2 lg:grid-cols-4'
        )}>
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(tier.popular && 'md:-mt-4 md:mb-4')}
            >
              <Card
                variant={tier.popular ? 'elevated' : 'outlined'}
                padding="lg"
                className={cn(
                  'h-full relative',
                  tier.popular && 'ring-2 ring-[var(--primary)]'
                )}
              >
                {tier.popular && (
                  <Badge
                    variant="accent"
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    Most Popular
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">
                    {tier.name}
                  </h3>
                  {tier.description && (
                    <p className="text-sm text-[var(--foreground-muted)]">
                      {tier.description}
                    </p>
                  )}
                </div>

                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-[var(--primary)]">
                    ${tier.price.toLocaleString()}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--foreground)]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={tier.href} className="block">
                  <Button
                    variant={tier.popular ? 'primary' : 'outline'}
                    fullWidth
                  >
                    {tier.ctaText || 'Get Started'}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface RetreatPricingProps {
  basePrice: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string;
  depositAmount: number;
  inclusions: string[];
  exclusions?: string[];
  extensionPrice?: number;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function RetreatPricing({
  basePrice,
  earlyBirdPrice,
  earlyBirdDeadline,
  depositAmount,
  inclusions,
  exclusions,
  extensionPrice,
  ctaText = 'Apply for This Retreat',
  ctaHref = '/apply',
  className,
}: RetreatPricingProps) {
  const isEarlyBirdActive = earlyBirdDeadline
    ? new Date(earlyBirdDeadline) > new Date()
    : false;

  return (
    <section className={cn('section', className)}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--secondary)] font-medium tracking-wide uppercase text-sm mb-3">
              Investment
            </p>
            <h2 className="text-[var(--foreground)]">Retreat Pricing</h2>
          </div>

          <Card variant="elevated" padding="lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  {isEarlyBirdActive && earlyBirdPrice && (
                    <div className="mb-4">
                      <Badge variant="warning" className="mb-2">
                        Early Bird - Save ${basePrice - earlyBirdPrice}
                      </Badge>
                      <p className="text-3xl font-bold text-[var(--primary)]">
                        ${earlyBirdPrice.toLocaleString()}
                        <span className="text-lg font-normal text-[var(--foreground-muted)] line-through ml-3">
                          ${basePrice.toLocaleString()}
                        </span>
                      </p>
                      <p className="text-sm text-[var(--foreground-muted)] mt-1">
                        Until {new Date(earlyBirdDeadline!).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  )}
                  {!isEarlyBirdActive && (
                    <p className="text-3xl font-bold text-[var(--primary)]">
                      ${basePrice.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-[var(--muted)]">
                    <span className="text-[var(--foreground)]">Deposit to reserve</span>
                    <span className="font-medium">${depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-[var(--muted)]">
                    <span className="text-[var(--foreground)]">Balance due</span>
                    <span className="font-medium">30 days before retreat</span>
                  </div>
                  {extensionPrice && (
                    <div className="flex justify-between py-3 border-b border-[var(--muted)]">
                      <span className="text-[var(--foreground)]">+2 Day Extension</span>
                      <span className="font-medium">+${extensionPrice.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <Link href={ctaHref} className="block mt-8">
                  <Button variant="primary" size="lg" fullWidth>
                    {ctaText}
                  </Button>
                </Link>
              </div>

              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-4">
                  What&apos;s Included
                </h4>
                <ul className="space-y-3 mb-8">
                  {inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--foreground)]">{item}</span>
                    </li>
                  ))}
                </ul>

                {exclusions && exclusions.length > 0 && (
                  <>
                    <h4 className="font-medium text-[var(--foreground)] mb-4">
                      Not Included
                    </h4>
                    <ul className="space-y-2 text-[var(--foreground-muted)]">
                      {exclusions.map((item, i) => (
                        <li key={i}>&bull; {item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
