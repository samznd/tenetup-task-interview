'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/shared/ui/button';
import { ServiceCard } from './service-card';
import { ServiceCardSkeleton } from './service-card-skeleton';
import { DeleteConfirmationModal } from './modals/delete-confirmation-modal';
import { useServicesContext } from '@/contexts/services-context';

export const ServicesList = () => {
  const {
    services,
    openModal,
    deleteService,
    deleteServiceId,
    openDeleteModal,
    closeDeleteModal,
    isDeleting,
    isLoading,
  } = useServicesContext();

  const serviceToDelete = services.find((s) => s.id === deleteServiceId) || null;

  return (
    <div className="w-full mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Services List</h1>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => openModal()}
        >
          Add New Service
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ServiceCardSkeleton key={index} />
          ))
        ) : (
          services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onEdit={() => openModal(service.id)}
              onDelete={() => openDeleteModal(service.id)}
            />
          ))
        )}
      </div>

      <DeleteConfirmationModal
        show={!!deleteServiceId}
        service={serviceToDelete}
        onConfirm={() => deleteService(deleteServiceId!)}
        onCancel={closeDeleteModal}
        isDeleting={isDeleting}
      />
    </div>
  );
};

