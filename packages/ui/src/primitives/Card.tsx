'use client';

import { forwardRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = false, padding = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white',
      elevated: 'bg-white shadow-lg',
      outlined: 'bg-white border border-[var(--muted)]',
      glass: 'bg-white/80 backdrop-blur-md',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl overflow-hidden',
          variants[variant],
          paddings[padding],
          hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  overlay?: boolean;
  className?: string;
}

const CardImage = ({ src, alt, aspectRatio = 'video', overlay = false, className }: CardImageProps) => {
  const aspects = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <div className={cn('relative overflow-hidden', aspects[aspectRatio], className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      )}
    </div>
  );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-1.5', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h2' | 'h3' | 'h4';
  children: React.ReactNode;
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-xl font-medium text-[var(--foreground)]', className)}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = 'CardTitle';

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-[var(--foreground-muted)] leading-relaxed', className)}
      {...props}
    >
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

interface OfferingCardProps {
  title: string;
  description: string;
  image: string;
  price?: number | null;
  priceLabel?: string;
  href: string;
  badge?: string;
}

const OfferingCard = ({
  title,
  description,
  image,
  price,
  priceLabel = 'From',
  href,
  badge,
}: OfferingCardProps) => {
  return (
    <Link href={href} className="group block">
      <Card variant="elevated" padding="none" hover className="h-full">
        <div className="relative">
          <CardImage src={image} alt={title} aspectRatio="video" overlay />
          {badge && (
            <span className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--foreground)] px-3 py-1 rounded-full text-sm font-medium">
              {badge}
            </span>
          )}
          {price && (
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-sm text-[var(--foreground-muted)]">{priceLabel} </span>
              <span className="text-xl font-semibold text-[var(--primary)]">
                ${price.toLocaleString()}
              </span>
            </div>
          )}
        </div>
        <CardContent>
          <CardTitle className="group-hover:text-[var(--primary)] transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
          <span className="inline-flex items-center gap-2 mt-4 text-[var(--primary)] font-medium group-hover:gap-3 transition-all">
            Learn More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export { Card, CardImage, CardContent, CardHeader, CardTitle, CardDescription, OfferingCard };
