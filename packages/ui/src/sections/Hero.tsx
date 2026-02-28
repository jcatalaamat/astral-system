'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { Button } from '../primitives/Button';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  showScrollIndicator?: boolean;
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
  height?: 'full' | 'large' | 'medium';
  align?: 'left' | 'center';
  badge?: string;
  scrollLabel?: string;
}

export function Hero({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundVideo,
  primaryCta,
  secondaryCta,
  showScrollIndicator = true,
  overlay = 'gradient',
  height = 'full',
  align = 'center',
  badge,
  scrollLabel = 'Explore',
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const heights = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[70vh]',
  };

  const overlays = {
    dark: 'bg-black/50',
    light: 'bg-white/30',
    gradient: 'bg-gradient-to-b from-black/30 via-black/40 to-black/70',
    none: '',
  };

  const alignments = {
    left: 'items-start text-left',
    center: 'items-center text-center',
  };

  return (
    <section className={cn('relative flex flex-col justify-center', heights[height])}>
      <div className="absolute inset-0 z-0">
        {backgroundVideo && (
          <video
            ref={videoRef}
            className={cn(
              'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000',
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            )}
            src={backgroundVideo}
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
          />
        )}
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            className={cn(
              'object-cover',
              backgroundVideo && isVideoLoaded ? 'opacity-0' : 'opacity-100'
            )}
            priority
          />
        )}
        {overlay !== 'none' && (
          <div className={cn('absolute inset-0', overlays[overlay])} />
        )}
      </div>

      <div className="container relative z-10 py-32">
        <motion.div
          className={cn('flex flex-col max-w-4xl mx-auto', alignments[align])}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {badge && (
            <motion.span
              className="inline-block px-4 py-1.5 mb-6 text-sm font-medium bg-white/20 backdrop-blur-sm text-white rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              {badge}
            </motion.span>
          )}

          {subtitle && (
            <motion.p
              className="text-[var(--accent)] font-medium tracking-wide uppercase text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            className="text-white text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {description}
            </motion.p>
          )}

          {(primaryCta || secondaryCta) && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {primaryCta && (
                <Link href={primaryCta.href}>
                  <Button variant="accent" size="lg">
                    {primaryCta.text}
                  </Button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--primary)]">
                    {secondaryCta.text}
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {showScrollIndicator && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
            aria-label="Scroll to content"
          >
            <span className="text-xs uppercase tracking-widest">{scrollLabel}</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      )}
    </section>
  );
}

interface HeroImageProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  badge?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export function HeroImage({
  title,
  subtitle,
  backgroundImage,
  badge,
  breadcrumbs,
}: HeroImageProps) {
  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-end">
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      </div>

      <div className="container relative z-10 pb-12 md:pb-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/70">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && <span>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {badge && (
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-[var(--accent)] text-[var(--foreground)] rounded-full">
            {badge}
          </span>
        )}

        <h1 className="text-white">{title}</h1>

        {subtitle && (
          <p className="mt-4 text-xl text-white/80 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
}

export function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  primaryCTA,
  secondaryCTA,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <Image src={backgroundImage} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      <div className="container relative z-10 py-20">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {subtitle && (
            <p className="text-[var(--accent)] font-medium tracking-wide uppercase text-sm mb-4">
              {subtitle}
            </p>
          )}

          <h1 className="text-white mb-6">{title}</h1>

          {description && (
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
              {description}
            </p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCTA && (
                <Link href={primaryCTA.href}>
                  <Button variant="accent" size="lg">{primaryCTA.label}</Button>
                </Link>
              )}
              {secondaryCTA && (
                <Link href={secondaryCTA.href}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--primary)]">
                    {secondaryCTA.label}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  videoSrc: string;
  posterImage: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  scrollLabel?: string;
}

export function VideoHero({
  title,
  subtitle,
  description,
  videoSrc,
  posterImage,
  primaryCTA,
  secondaryCTA,
  scrollLabel = 'Explore',
}: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000',
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          )}
          src={videoSrc}
          muted
          loop
          playsInline
          poster={posterImage}
          onLoadedData={() => setIsVideoLoaded(true)}
        />
        <Image
          src={posterImage}
          alt=""
          fill
          className={cn(
            'object-cover transition-opacity duration-1000',
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          )}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      </div>

      <div className="container relative z-10 py-32">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {subtitle && (
            <motion.p
              className="text-[var(--accent)] font-medium tracking-wide uppercase text-sm mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {subtitle}
            </motion.p>
          )}

          <motion.h1
            className="text-white text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {description}
            </motion.p>
          )}

          {(primaryCTA || secondaryCTA) && (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {primaryCTA && (
                <Link href={primaryCTA.href}>
                  <Button variant="accent" size="lg">{primaryCTA.label}</Button>
                </Link>
              )}
              {secondaryCTA && (
                <Link href={secondaryCTA.href}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[var(--primary)]">
                    {secondaryCTA.label}
                  </Button>
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
          aria-label="Scroll to content"
        >
          <span className="text-xs uppercase tracking-widest">{scrollLabel}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
