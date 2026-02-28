'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../primitives/Button';
import { Input } from '../primitives/Input';
import { cn } from '../utils/cn';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'card';
  apiEndpoint?: string;
  communityCount?: string;
}

export function NewsletterSignup({
  title = 'Stay Connected',
  description = 'Receive updates on upcoming events, resources, and insights for your journey.',
  className,
  variant = 'default',
  apiEndpoint = '/api/newsletter',
  communityCount,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Welcome to our community! Check your email to confirm your subscription.');
        setEmail('');
        setFirstName('');
      } else {
        throw new Error('Subscription failed');
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('py-4', className)}>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining...' : 'Subscribe'}
          </Button>
        </form>
        {status !== 'idle' && (
          <p className={cn(
            'text-sm mt-2',
            status === 'success' ? 'text-[var(--primary)]' : 'text-red-600'
          )}>
            {message}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          'bg-white rounded-2xl p-8 shadow-lg border border-[var(--muted)]',
          className
        )}
      >
        <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">{title}</h3>
        <p className="text-[var(--foreground-muted)] mb-6">{description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={status === 'loading'} className="w-full">
            {status === 'loading' ? 'Joining...' : 'Join Our Community'}
          </Button>
        </form>

        {status !== 'idle' && (
          <p className={cn(
            'text-sm mt-4 text-center',
            status === 'success' ? 'text-[var(--primary)]' : 'text-red-600'
          )}>
            {message}
          </p>
        )}

        <p className="text-xs text-[var(--foreground-muted)] mt-4 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    );
  }

  return (
    <section className={cn('section bg-[var(--primary)]', className)}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-white mb-4">{title}</h2>
          <p className="text-white/80 mb-8">{description}</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button type="submit" variant="accent" disabled={status === 'loading'}>
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </Button>
          </form>

          {status !== 'idle' && (
            <p className={cn(
              'text-sm mt-4',
              status === 'success' ? 'text-[var(--muted-light,var(--muted))]' : 'text-red-300'
            )}>
              {message}
            </p>
          )}

          {communityCount && (
            <p className="text-white/60 text-sm mt-6">
              Join {communityCount} receiving our monthly insights
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
