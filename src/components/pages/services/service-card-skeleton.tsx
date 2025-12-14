'use client';

export const ServiceCardSkeleton = () => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border-[1.5px] border-gray-600 relative min-w-[357px] animate-pulse'>
      <div className='flex justify-between items-center mb-4'>
        <div className='h-6 w-32 bg-gray-200 rounded' />
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 bg-gray-200 rounded' />
          <div className='w-6 h-6 bg-gray-200 rounded' />
        </div>
      </div>

      <div className='border-b border-dashed mb-4' />

      <div className='space-y-3'>
        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-200 rounded' />
          <div className='h-4 w-16 bg-gray-200 rounded' />
        </div>
        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-200 rounded' />
          <div className='h-4 w-16 bg-gray-200 rounded' />
        </div>
        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-200 rounded' />
          <div className='h-4 w-16 bg-gray-200 rounded' />
        </div>
        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-200 rounded' />
          <div className='h-4 w-16 bg-gray-200 rounded' />
        </div>
        <div className='flex justify-between'>
          <div className='h-4 w-24 bg-gray-200 rounded' />
          <div className='h-4 w-16 bg-gray-200 rounded' />
        </div>
      </div>
    </div>
  );
};

