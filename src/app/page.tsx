'use client';

import { ServicesProvider, useServicesContext } from '@/contexts/services-context';
import { EmptyServices } from "@/components/pages/services/empty-services";
import { ServicesList } from "@/components/pages/services/services-list";
import { ServiceModal } from "@/components/pages/services/modals/service-modal";

const HomeContent = () => {
  const { services, isModalOpen, closeModal, editingServiceId, isLoading } = useServicesContext();

  return (
    <div className="min-h-screen bg-white">
      <main className="min-h-screen w-full">
        {!isLoading && services.length === 0 ? (
          <div className="flex items-center justify-center p-8 min-h-screen">
            <div className="w-full max-w-3xl">
              <EmptyServices />
            </div>
          </div>
        ) : (
          <ServicesList />
        )}
        
        <ServiceModal show={isModalOpen} onClose={closeModal} editingServiceId={editingServiceId} />
      </main>
    </div>
  );
};

export default function Home() {
  return (
    <ServicesProvider>
      <HomeContent />
    </ServicesProvider>
  );
}
