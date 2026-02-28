'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, MapPin, Heart } from 'lucide-react';
import { cn } from '../utils/cn';

interface FooterLinkColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  siteName: string;
  logoSrc?: string;
  tagline?: string;
  location?: {
    city: string;
    country: string;
    detail?: string;
  };
  email?: string;
  instagramHandle?: string;
  columns?: FooterLinkColumn[];
  donationText?: string;
  donationUrl?: string;
  donationOrg?: string;
  className?: string;
}

export function Footer({
  siteName,
  logoSrc,
  tagline,
  location,
  email,
  instagramHandle,
  columns = [],
  donationText,
  donationUrl,
  donationOrg,
  className,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-[var(--primary)] text-white', className)}>
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-3">
                {logoSrc && (
                  <div className="relative w-12 h-12 bg-white/10 rounded-lg p-2">
                    <Image
                      src={logoSrc}
                      alt={siteName}
                      fill
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                )}
                <span className="font-serif text-2xl font-medium">{siteName}</span>
              </div>
            </Link>

            {tagline && (
              <p className="mt-6 text-white/80 leading-relaxed max-w-sm">
                {tagline}
              </p>
            )}

            {location && (
              <div className="mt-6 flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p>{location.city}, {location.country}</p>
                  {location.detail && <p className="text-sm">{location.detail}</p>}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              {instagramHandle && (
                <a
                  href={`https://instagram.com/${instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            &copy; {currentYear} {siteName}. All rights reserved.
          </p>

          {donationText && donationUrl && donationOrg && (
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span>{donationText}</span>
              <a
                href={donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:text-white transition-colors inline-flex items-center gap-1"
              >
                {donationOrg}
                <Heart className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
