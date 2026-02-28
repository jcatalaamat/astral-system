'use client';

import Image from 'next/image';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from '../primitives/Carousel';
import { Card } from '../primitives/Card';
import { cn } from '../utils/cn';

interface Testimonial {
  id: string;
  name: string;
  quote: string;
  service: string;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  showRating?: boolean;
  variant?: 'default' | 'cards' | 'minimal';
  autoplay?: boolean;
  className?: string;
}

export function TestimonialCarousel({
  testimonials,
  title = 'What Our Guests Say',
  subtitle,
  showRating = true,
  variant = 'default',
  autoplay = true,
  className,
}: TestimonialCarouselProps) {
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

        <Carousel
          opts={{ align: 'start', loop: true }}
          autoplay={autoplay}
          autoplayDelay={6000}
          className="relative"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={testimonial.id}
                className={cn(
                  'pl-4',
                  variant === 'cards' ? 'md:basis-1/2 lg:basis-1/3' : 'md:basis-1/2'
                )}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  showRating={showRating}
                  variant={variant}
                  index={index}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 lg:-left-12" />
          <CarouselNext className="-right-4 lg:-right-12" />
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  showRating?: boolean;
  variant?: 'default' | 'cards' | 'minimal';
  index?: number;
}

function TestimonialCard({
  testimonial,
  showRating = true,
  variant = 'default',
}: TestimonialCardProps) {
  if (variant === 'minimal') {
    return (
      <div className="p-6">
        <Quote className="w-10 h-10 text-[var(--muted-light,var(--muted))] mb-4" />
        <p className="text-lg text-[var(--foreground)] italic leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <div className="flex items-center gap-3">
          {testimonial.image && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
            </div>
          )}
          <div>
            <p className="font-medium text-[var(--foreground)]">{testimonial.name}</p>
            <p className="text-sm text-[var(--foreground-muted)] capitalize">
              {testimonial.service} guest
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card variant="outlined" padding="lg" className="h-full">
      <div className="flex flex-col h-full">
        {showRating && (
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-[var(--accent)] text-[var(--accent)]"
              />
            ))}
          </div>
        )}

        <div className="flex-1">
          <Quote className="w-8 h-8 text-[var(--muted)]/30 mb-2" />
          <p className="text-[var(--foreground)] leading-relaxed">
            {testimonial.quote}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-[var(--muted)]">
          {testimonial.image && (
            <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--muted-light,var(--muted))]">
              <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
            </div>
          )}
          <div>
            <p className="font-medium text-[var(--foreground)]">{testimonial.name}</p>
            <p className="text-sm text-[var(--foreground-muted)] capitalize">
              {testimonial.service} guest
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function TestimonialGrid({
  testimonials,
  title = 'What Our Guests Say',
  subtitle,
  className,
}: TestimonialGridProps) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} variant="cards" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
