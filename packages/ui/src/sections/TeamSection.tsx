'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '../utils/cn';
import { Card } from '../primitives/Card';

interface TeamMemberData {
  name: string;
  credentials?: string;
  role: string;
  image: string;
  bio: string;
  education?: string[];
  certifications?: string[];
  training?: string[];
}

interface TeamSectionProps {
  members: TeamMemberData[];
  title?: string;
  subtitle?: string;
  description?: string;
  showVideo?: boolean;
  variant?: 'full' | 'compact';
  className?: string;
}

export function TeamSection({
  members,
  title = 'Meet Your Guides',
  subtitle = 'Our Team',
  description,
  showVideo = false,
  variant = 'full',
  className,
}: TeamSectionProps) {
  if (variant === 'compact') {
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

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="outlined" padding="none" className="overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image src={member.image} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium text-[var(--foreground)]">
                      {member.name}
                      {member.credentials && (
                        <span className="text-[var(--foreground-muted)] font-normal">
                          , {member.credentials}
                        </span>
                      )}
                    </h3>
                    <p className="text-[var(--secondary)] text-sm mt-1">{member.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('section', className)}>
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          {subtitle && (
            <p className="text-[var(--secondary)] font-medium tracking-wide uppercase text-sm mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="text-[var(--foreground)]">{title}</h2>
          {description && (
            <p className="mt-4 text-[var(--foreground-muted)] text-lg">{description}</p>
          )}
        </div>

        <div className="space-y-24">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              className={cn(
                'grid lg:grid-cols-2 gap-12 items-center',
                index % 2 === 1 && 'lg:[&>*:first-child]:order-2'
              )}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                {showVideo && (
                  <button className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:bg-white transition-colors">
                    <Play className="w-4 h-4 text-[var(--primary)]" />
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      Watch Introduction
                    </span>
                  </button>
                )}
              </div>

              <div>
                <h3 className="text-3xl font-medium text-[var(--foreground)]">
                  {member.name}
                  {member.credentials && (
                    <span className="text-[var(--foreground-muted)] font-normal">
                      , {member.credentials}
                    </span>
                  )}
                </h3>
                <p className="text-[var(--secondary)] text-lg mt-2">{member.role}</p>

                <p className="mt-6 text-[var(--foreground-muted)] leading-relaxed">
                  {member.bio}
                </p>

                {member.education && (
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)] mb-3">
                      Education
                    </h4>
                    <ul className="space-y-2">
                      {member.education.map((edu, i) => (
                        <li key={i} className="text-[var(--foreground-muted)]">{edu}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {member.certifications && (
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)] mb-3">
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.certifications.map((cert, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[var(--muted-light,var(--muted))] text-[var(--primary)] text-sm rounded-full"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.training && (
                  <div className="mt-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--foreground)] mb-3">
                      Training & Experience
                    </h4>
                    <ul className="space-y-2">
                      {member.training.map((item, i) => (
                        <li key={i} className="text-[var(--foreground-muted)]">{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface TeamMemberCardProps {
  name: string;
  credentials?: string;
  role: string;
  image: string;
  bio?: string;
  className?: string;
}

export function TeamMemberCard({
  name,
  credentials,
  role,
  image,
  bio,
  className,
}: TeamMemberCardProps) {
  return (
    <Card variant="outlined" padding="lg" className={cn('flex gap-6', className)}>
      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div>
        <h4 className="text-lg font-medium text-[var(--foreground)]">
          {name}
          {credentials && (
            <span className="text-[var(--foreground-muted)] font-normal">
              , {credentials}
            </span>
          )}
        </h4>
        <p className="text-[var(--secondary)] text-sm">{role}</p>
        {bio && (
          <p className="mt-2 text-sm text-[var(--foreground-muted)] line-clamp-3">
            {bio}
          </p>
        )}
      </div>
    </Card>
  );
}
