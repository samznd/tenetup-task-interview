'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { serviceSchema, ServiceFormData } from '@/schemas/service-schema';
import { ServiceFormProvider } from '@/contexts/service-form-context';
import { ServiceModalContent } from './service-modal-content';

interface ServiceModalProps {
  show?: boolean;
  onClose?: () => void;
  editingServiceId?: string | null;
}

export const ServiceModal = ({ show = false, onClose, editingServiceId }: ServiceModalProps) => {
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    mode: 'onChange',
    defaultValues: {} as Partial<ServiceFormData>,
  });

  return (
    <ServiceFormProvider form={form}>
      <ServiceModalContent show={show} onClose={onClose} editingServiceId={editingServiceId} />
    </ServiceFormProvider>
  );
};

