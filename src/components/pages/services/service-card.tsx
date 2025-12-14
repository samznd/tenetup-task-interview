'use client';

import { PencilLine, Trash2 } from 'lucide-react';
import { Service } from '@/types/service';
import { ServiceSpecRow } from './service-spec-row';

interface ServiceCardProps {
  service: Service;
  onEdit: () => void;
  onDelete: () => void;
}

export const ServiceCard = ({
  service,
  onEdit,
  onDelete,
}: ServiceCardProps) => {
  return (
    <div className='bg-white rounded-lg p-6 shadow-sm border-[1.5px] border-gray-600 relative min-w-[357px]'>
      <div className='flex justify-between  items-center'>
        <h3 className='text-lg font-bold mb-4'>
          {service.serviceType === 'hosting'
            ? 'Hosting Service'
            : 'VPS Service'}
        </h3>
        <div className='flex items-center gap-2'>
          <button
            onClick={onEdit}
            className='p-1.5 hover:bg-gray-100 rounded transition-colors cursor-pointer'
            aria-label='Edit service'
          >
            <PencilLine className='w-4 h-4' />
          </button>
          <button
            onClick={onDelete}
            className='p-1.5 hover:bg-gray-100 rounded transition-colors cursor-pointer'
            aria-label='Delete service'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </div>
      </div>

      <div className='border-b border-dashed mb-4' />

      <div className='space-y-3'>
        <ServiceSpecRow label='Hard Disk' value={service.hardDisk} unit='GB' />

        {service.serviceType === 'hosting' ? (
          <>
            <ServiceSpecRow
              label='Email Accounts'
              value={service.emailAccounts}
            />
            <ServiceSpecRow
              label='Addon Domains'
              value={service.addonDomains}
            />
          </>
        ) : (
          <>
            <ServiceSpecRow label='RAM' value={service.ram} unit='GB' />
            <ServiceSpecRow label='CPU Cores' value={service.cpuCount} />
          </>
        )}

        <ServiceSpecRow label='Bandwidth' value={service.bandwidth} unit='GB' />
      </div>
    </div>
  );
};
