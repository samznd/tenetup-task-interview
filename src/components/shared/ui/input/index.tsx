'use client';
import { cn } from '@/shared/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  formGroupClassname?: string;
  labelClassName?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const Input = ({
  label,
  error,
  helperText,
  className,
  formGroupClassname,
  labelClassName,
  disabled,
  name,
  id,
  value,
  ref,
  ...props
}: InputProps) => {
    const inputId = id || name;
    const hasError = Boolean(error);
    const inputValue = value !== undefined && value !== null ? String(value) : '';

    return (
      <div className={cn('w-full', formGroupClassname)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'block font-semibold text-sm text-neutral-900 mb-2',
              labelClassName
            )}
          >
            {label}
            {props.required && (
              <span className="text-error text-base! font-normal! ml-1">*</span>
            )}
          </label>
        )}
        <div className="w-full relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            disabled={disabled}
            onWheel={(e) => e.currentTarget.blur()}
            aria-invalid={hasError}
            aria-describedby={
              hasError 
                ? `${inputId}-error` 
                : helperText 
                  ? `${inputId}-helper` 
                  : undefined
            }
            className={cn(
              'w-full border border-neutral-200 bg-white h-10 px-[10px] rounded-lg outline-none',
              'transition-colors',
              'focus:outline-none',
              {
                'border-error': hasError,
                'text-gray-700': !disabled,
                'text-gray-400': disabled,
                'cursor-not-allowed bg-gray-50': disabled,
              },
              'placeholder:text-xs placeholder:text-gray-3',
              className
            )}
            style={{ fontSize: '14px' }}
            value={inputValue}
            {...props}
          />
        </div>
        {helperText && !error && (
          <p
            id={inputId ? `${inputId}-helper` : undefined}
            className="mt-1 text-xs font-semibold text-gray-700"
          >
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={inputId ? `${inputId}-error` : undefined}
            className="mt-1 text-xs font-semibold text-error"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
};
