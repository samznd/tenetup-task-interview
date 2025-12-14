'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/utils';

interface Option {
  title: string;
  id: unknown;
}

interface ISelect {
  label?: string;
  options?: Option[];
  value?: unknown;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (value: unknown) => void;
  containerClassName?: string;
  labelClassName?: string;
  className?: string;
}

export const Select = ({
  label,
  options = [],
  value,
  error,
  disabled,
  onChange,
  placeholder,
  containerClassName,
  className,
  labelClassName,
}: ISelect) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const selectRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const selected = useMemo(
    () => (value ? options.find((opt) => opt.id === value) : null),
    [value, options]
  );

  useEffect(() => {
    if (open && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !selectRef.current?.contains(e.target as Node) &&
        !menuRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <>
      <div
        className={cn('flex flex-col w-full', containerClassName)}
      >
        {label && (
          <label
            className={cn('block text-base font-bold mb-1', labelClassName, {
              'text-accent/60': disabled,
            })}
          >
            {label}
          </label>
        )}

        <div
          ref={selectRef}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={cn(
            'w-full relative border border-neutral-200 rounded-md h-10 px-3 py-2 outline-none focus:outline-none transition cursor-pointer flex items-center justify-between',
            {
              'border-error': error,
              'text-gray-400 cursor-not-allowed bg-gray-50': disabled,
              'text-gray-700': !disabled,
            },
            className
          )}
        >
          <span
            className={cn('text-sm flex items-center gap-2 flex-1', {
              'text-gray-400': disabled,
              'text-gray-700': !disabled && selected,
              'text-gray-500': !disabled && !selected,
            })}
          >
            {selected ? selected.title : placeholder || ''}
          </span>
          <div
            className={cn(
              'absolute z-20 top-1/2 -translate-y-1/2 cursor-pointer right-3 transition-transform',
              { 'rotate-180': open },
              disabled && 'opacity-50'
            )}
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      {open &&
        createPortal(
          <ul
            className='fixed z-50 mt-1 max-h-60 overflow-auto rounded-md bg-white p-3 border border-gray-200 shadow-lg'
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            ref={menuRef}
          >
            {options.map((opt) => (
              <li
                key={opt.id as string}
                className={`cursor-pointer hover:px-3 py-2 transition-all hover:text-secondary rounded-lg text-sm ${
                  opt.id === value ? 'text-secondary ' : ''
                }`}
                onClick={() => {
                  onChange?.(opt.id);
                  setOpen(false);
                }}
              >
                {' '}
                {opt.title}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
};
