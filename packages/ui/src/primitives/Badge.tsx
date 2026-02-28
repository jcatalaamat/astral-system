'use client';

import { cn } from '../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'urgent' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

const Badge = ({
  className,
  variant = 'default',
  size = 'md',
  pulse = false,
  children,
  ...props
}: BadgeProps) => {
  const variants = {
    default: 'bg-[var(--muted)] text-[var(--foreground)]',
    success: 'bg-green-500 text-white',
    warning: 'bg-[var(--accent)] text-[var(--foreground)]',
    urgent: 'bg-red-500 text-white',
    accent: 'bg-[var(--primary)] text-white',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        pulse && 'animate-pulse',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

interface SpotsRemainingBadgeProps {
  spots: number;
  total?: number;
  className?: string;
}

const SpotsRemainingBadge = ({ spots, total, className }: SpotsRemainingBadgeProps) => {
  const variant = spots <= 3 ? 'urgent' : spots <= 6 ? 'warning' : 'success';
  const pulse = spots <= 3;

  return (
    <Badge variant={variant} pulse={pulse} className={className}>
      {spots} {spots === 1 ? 'spot' : 'spots'} remaining
      {total && ` of ${total}`}
    </Badge>
  );
};

interface DateBadgeProps {
  startDate: string;
  endDate?: string;
  className?: string;
}

const DateBadge = ({ startDate, endDate, className }: DateBadgeProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Badge variant="accent" className={className}>
      {formatDate(startDate)}
      {endDate && ` - ${formatDate(endDate)}`}
    </Badge>
  );
};

export { Badge, SpotsRemainingBadge, DateBadge };
