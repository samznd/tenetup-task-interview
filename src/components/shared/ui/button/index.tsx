'use client';
import { ReactNode } from 'react';
import { cn } from '@/shared/utils';

type IButton = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: VariantButton;
  isLoading?: boolean;
  icon?: ReactNode;
  noIcon?: boolean;
  classNameIcon?: string;
};
const baseStyles =
  'px-3 py-2 h-10 rounded-lg text-xs font-semibold transition focus:outline-none flex items-center gap-6 justify-center cursor-pointer disabled:opacity-50 disabled:cursor-default disabled:bg-gray-title';
const variants = {
  primary: 'bg-accent hover:bg-accent/90 text-white',
  outline: 'border border-neutral-200 bg-transparent hover:bg-gray-50 text-gray-700',
};
export type VariantButton = keyof typeof variants;

export const Button = ({
  children,
  variant = 'primary',
  isLoading = false,
  className,
  classNameIcon,
  icon,
  noIcon,
  disabled,
  ...props
}: IButton) => {
  return (
    <button
      className={cn(baseStyles, variants[variant] as string, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        'Loading...'
      ) : children ? (
        <span className='whitespace-nowrap font-medium '>{children}</span>
      ) : (
        ''
      )}
      {!noIcon && (
        <>
          {icon ? (
            icon
          ) : null}
        </>
      )}
    </button>
  );
};
