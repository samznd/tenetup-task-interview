'use client';

import { createContext, useContext, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ServiceFormData } from '@/schemas/service-schema';

interface ServiceFormContextType {
  form: UseFormReturn<ServiceFormData>;
}

const ServiceFormContext = createContext<ServiceFormContextType | undefined>(undefined);

export const useServiceFormContext = () => {
  const context = useContext(ServiceFormContext);
  if (!context) {
    throw new Error('useServiceFormContext must be used within ServiceFormProvider');
  }
  return context;
};

interface ServiceFormProviderProps {
  children: ReactNode;
  form: UseFormReturn<ServiceFormData>;
}

export const ServiceFormProvider = ({ children, form }: ServiceFormProviderProps) => {
  return (
    <ServiceFormContext.Provider value={{ form }}>
      {children}
    </ServiceFormContext.Provider>
  );
};

