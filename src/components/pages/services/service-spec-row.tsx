'use client';

interface ServiceSpecRowProps {
  label: string;
  value: string | number;
  unit?: string;
}

export const ServiceSpecRow = ({ label, value, unit }: ServiceSpecRowProps) => {
  return (
    <div className='flex justify-between'>
      <span className='text-xs text-gray-600 font-medium'>{label}:</span>
      <span className='text-xs font-semibold'>
        {value} {unit || ''}
      </span>
    </div>
  );
};

