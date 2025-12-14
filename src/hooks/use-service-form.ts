import { useEffect, useRef } from 'react';
import { ServiceFormData } from '@/schemas/service-schema';
import { ServiceType } from '@/constants/services';
import { useServiceFormContext } from '@/contexts/service-form-context';
import { useServicesContext } from '@/contexts/services-context';

export const useServiceForm = (editingServiceId: string | null | undefined) => {
  const { form } = useServiceFormContext();
  const { addService, updateService, services, isSubmitting } = useServicesContext();
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = form;

  const serviceType = watch('serviceType') as ServiceType | undefined;
  const previousServiceTypeRef = useRef<ServiceType | undefined>(undefined);

  useEffect(() => {
    if (editingServiceId) {
      const service = services.find((s) => s.id === editingServiceId);
      if (service) {
        const { id: _, ...formData } = service;
        reset(formData as ServiceFormData);
        previousServiceTypeRef.current = service.serviceType;
      }
    } else {
      reset({} as Partial<ServiceFormData>);
      previousServiceTypeRef.current = undefined;
    }
  }, [editingServiceId, services, reset]);

  useEffect(() => {
    if (serviceType && previousServiceTypeRef.current !== undefined && previousServiceTypeRef.current !== serviceType) {
      reset({
        serviceType,
        ...(serviceType === 'hosting'
          ? {
              hardDisk: '',
              emailAccounts: '',
              addonDomains: '',
              bandwidth: '',
            }
          : {
              hardDisk: '',
              ram: '',
              cpuCount: '',
              bandwidth: '',
            }),
      } as ServiceFormData);
    } else if (serviceType && !editingServiceId && previousServiceTypeRef.current === undefined) {
      reset({
        serviceType,
        ...(serviceType === 'hosting'
          ? {
              hardDisk: '',
              emailAccounts: '',
              addonDomains: '',
              bandwidth: '',
            }
          : {
              hardDisk: '',
              ram: '',
              cpuCount: '',
              bandwidth: '',
            }),
      } as ServiceFormData);
    }
    previousServiceTypeRef.current = serviceType;
  }, [serviceType, reset, editingServiceId]);

  const onSubmit = (data: ServiceFormData) => {
    if (editingServiceId) {
      updateService(editingServiceId, data);
    } else {
      addService(data);
    }
  };

  const getError = (field: string): string | undefined => {
    const error = (errors as Record<string, { message?: string }>)[field];
    return error?.message;
  };

  return {
    control,
    handleSubmit,
    serviceType,
    isValid,
    onSubmit,
    getError,
    isSubmitting,
  };
};

