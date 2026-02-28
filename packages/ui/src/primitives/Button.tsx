'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface BaseButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButton extends BaseButtonProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps {
  href: string;
  disabled?: boolean;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles = `
  inline-flex items-center justify-center gap-2
  font-medium tracking-wide
  rounded-lg
  transition-all duration-300 ease-out
  focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  transform hover:scale-[1.02] active:scale-[0.98]
`;

const variants = {
  primary: `
    bg-[var(--primary)] text-white
    hover:bg-[var(--primary-hover)]
    focus-visible:ring-[var(--primary)]
    shadow-md hover:shadow-lg
  `,
  secondary: `
    bg-[var(--secondary)] text-white
    hover:bg-[var(--secondary-hover)]
    focus-visible:ring-[var(--secondary)]
    shadow-md hover:shadow-lg
  `,
  outline: `
    border-2 border-[var(--primary)] text-[var(--primary)]
    hover:bg-[var(--primary)] hover:text-white
    focus-visible:ring-[var(--primary)]
  `,
  ghost: `
    text-[var(--primary)]
    hover:bg-[var(--muted-light,var(--muted))]
    focus-visible:ring-[var(--primary)]
  `,
  accent: `
    bg-[var(--accent)] text-[var(--foreground)]
    hover:bg-[var(--accent-hover)]
    focus-visible:ring-[var(--accent)]
    shadow-md hover:shadow-lg
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      ...rest
    } = props;

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </>
    );

    if ('href' in props && props.href) {
      const { disabled, href, ...linkRest } = rest as ButtonAsLink & { href: string };
      return (
        <Link
          href={props.href}
          className={cn(combinedClassName, disabled && 'opacity-50 pointer-events-none')}
          {...linkRest}
        >
          {content}
        </Link>
      );
    }

    const { disabled, ...buttonRest } = rest as ButtonAsButton;
    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...buttonRest}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
