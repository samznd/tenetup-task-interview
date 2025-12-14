'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceFormData } from '@/schemas/service-schema';
import { Service } from '@/types/service';
import { storageService } from '@/utils/storage';

interface ServicesContextType {
  services: Service[];
  addService: (service: ServiceFormData) => Promise<void>;
  updateService: (id: string, service: ServiceFormData) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  isModalOpen: boolean;
  openModal: (serviceId?: string) => void;
  closeModal: () => void;
  editingServiceId: string | null;
  isSubmitting: boolean;
  isDeleting: boolean;
  deleteServiceId: string | null;
  openDeleteModal: (serviceId: string) => void;
  closeDeleteModal: () => void;
  isLoading: boolean;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const useServicesContext = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServicesContext must be used within ServicesProvider');
  }
  return context;
};

interface ServicesProviderProps {
  children: ReactNode;
}

export const ServicesProvider = ({ children }: ServicesProviderProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const startTime = Date.now();
    const MIN_LOADING_TIME = 500;

    const storedServices = storageService.get();
    if (storedServices.length > 0) {
      setServices(storedServices);
    }
    setIsHydrated(true);

    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (isHydrated) {
      storageService.set(services);
    }
  }, [services, isHydrated]);

  const addService = async (service: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newService: Service = {
        ...service,
        id: crypto.randomUUID(),
      };
      setServices((prev) => [...prev, newService]);
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateService = async (id: string, service: ServiceFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...service, id } : s))
      );
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteService = async (id: string) => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setServices((prev) => prev.filter((s) => s.id !== id));
      closeDeleteModal();
    } finally {
      setIsDeleting(false);
    }
  };

  const openModal = (serviceId?: string) => {
    setEditingServiceId(serviceId || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingServiceId(null);
  };

  const openDeleteModal = (serviceId: string) => {
    setDeleteServiceId(serviceId);
  };

  const closeDeleteModal = () => {
    setDeleteServiceId(null);
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        addService,
        updateService,
        deleteService,
        isModalOpen,
        openModal,
        closeModal,
        editingServiceId,
        isSubmitting,
        isDeleting,
        deleteServiceId,
        openDeleteModal,
        closeDeleteModal,
        isLoading,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

