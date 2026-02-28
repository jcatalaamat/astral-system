'use client';

import { motion } from 'framer-motion';
import {
  Droplets,
  Thermometer,
  Sparkles,
  Hand,
  Snowflake,
  Moon,
  Wind,
  Sun,
  Music,
  Palette,
  Heart,
  Leaf,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../utils/cn';

const iconMap: Record<string, LucideIcon> = {
  droplets: Droplets,
  thermometer: Thermometer,
  sparkles: Sparkles,
  hand: Hand,
  snowflake: Snowflake,
  moon: Moon,
  wind: Wind,
  sun: Sun,
  music: Music,
  palette: Palette,
  heart: Heart,
  leaf: Leaf,
};

interface Amenity {
  name: string;
  icon: string;
  description?: string;
}

interface AmenityGridProps {
  items: Amenity[];
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'icons' | 'cards';
}

export function AmenityGrid({
  items,
  title = 'Amenities',
  subtitle,
  className,
  variant = 'icons',
}: AmenityGridProps) {
  return (
    <section className={cn('section bg-white', className)}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {subtitle && (
            <p className="text-[var(--secondary)] font-medium tracking-wide uppercase text-sm mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-[var(--foreground)]">{title}</h2>
        </div>

        {variant === 'icons' ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {items.map((amenity, index) => {
              const Icon = iconMap[amenity.icon] || Sparkles;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex flex-col items-center text-center p-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[var(--muted-light,var(--muted))] flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {amenity.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {items.map((amenity, index) => {
              const Icon = iconMap[amenity.icon] || Sparkles;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-6 bg-[var(--background)] rounded-xl"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--muted-light,var(--muted))] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[var(--foreground)] mb-1">
                      {amenity.name}
                    </h4>
                    {amenity.description && (
                      <p className="text-sm text-[var(--foreground-muted)]">
                        {amenity.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

interface OfferingsListProps {
  items: string[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function OfferingsList({
  items,
  title = 'Available Offerings',
  subtitle,
  className,
}: OfferingsListProps) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {items.map((offering, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
              <span className="text-[var(--foreground)]">{offering}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface InclusionsListProps {
  items: string[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function InclusionsList({
  items,
  title = "What's Included",
  subtitle,
  className,
}: InclusionsListProps) {
  return (
    <section className={cn('section bg-white', className)}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {subtitle && (
            <p className="text-[var(--secondary)] font-medium tracking-wide uppercase text-sm mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-[var(--foreground)]">{title}</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid gap-4">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-4 bg-[var(--background)] rounded-lg"
              >
                <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[var(--foreground)]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
