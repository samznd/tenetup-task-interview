'use client';

import { AlertTriangle } from 'lucide-react';
import { Modal } from '@/components/shared/ui/modal';
import { Button } from '@/components/shared/ui/button';
import { Service } from '@/types/service';

interface DeleteConfirmationModalProps {
  show: boolean;
  service: Service | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmationModal = ({
  show,
  service,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmationModalProps) => {
  if (!service) return null;

  const serviceName = service.serviceType === 'hosting' ? 'Hosting Service' : 'VPS Service';

  return (
    <Modal
      show={show}
      title='Delete Service'
      onClose={isDeleting ? undefined : onCancel}
      footer={
        <>
          <Button variant='outline' onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={onConfirm}
            disabled={isDeleting}
            className='bg-error hover:bg-error/90'
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </>
      }
    >
      <div className='flex flex-col items-center gap-4 py-4'>
        <div className='w-16 h-16 rounded-full bg-error/10 flex items-center justify-center'>
          <AlertTriangle className='w-8 h-8 text-error' />
        </div>
        <div className='text-center space-y-2'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Are you sure you want to delete this service?
          </h3>
          <p className='text-sm text-gray-600'>
            This will permanently delete the <span className='font-semibold'>{serviceName}</span>.
            This action cannot be undone.
          </p>
        </div>
      </div>
    </Modal>
  );
};

