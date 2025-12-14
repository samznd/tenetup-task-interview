'use client';

import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export const LoadingOverlay = ({ isLoading, message = 'Processing...' }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className='fixed inset-0 bg-black/50 z-[100] flex items-center justify-center'>
      <div className='bg-white rounded-lg p-8 flex flex-col items-center gap-4 min-w-[300px]'>
        <Loader2 className='w-8 h-8 text-gray-600 animate-spin' />
        <p className='text-sm font-medium text-gray-700'>{message}</p>
      </div>
    </div>
  );
};

