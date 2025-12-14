'use client';

import { ReactNode, useRef } from 'react';
import ReactDOM from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/shared/utils';

export interface ModalProps {
  show?: boolean;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  footer?: ReactNode;
  className?: string;
  withOverlay?: boolean;
  position?: 'right' | 'center';
}

export const Modal = ({
  show = true,
  title = 'Add New Service',
  children,
  onClose,
  footer,
  className,
  withOverlay = true,
  position = 'center',
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!show) return null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      if (onClose) {
        onClose();
      }
    }
  };

  const modalContent = (
    <div
      ref={modalRef}
      className={cn(
        'bg-white rounded-lg shadow-xl w-full max-w-lg h-auto max-h-[90vh] flex flex-col',
        className
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Black Header */}
      <div className="bg-black text-white rounded-t-lg px-6 py-4 flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {children}
      </div>

      {/* Footer with buttons */}
      {footer && (
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          {footer}
        </div>
      )}
    </div>
  );

  if (withOverlay) {
    return ReactDOM.createPortal(
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 p-4',
          position === 'right' ? 'flex justify-end items-start' : 'flex justify-center items-center'
        )}
        onClick={handleClickOutside}
      >
        {modalContent}
      </div>,
      document.body
    );
  }

  return modalContent;
};

