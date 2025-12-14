'use client';

import { SearchGlobal } from "@/components/icons";
import { Button } from "@/components/shared/ui/button";
import { Plus } from 'lucide-react';
import { useServicesContext } from '@/contexts/services-context';

export const EmptyServices = () => {
  const { openModal } = useServicesContext();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8 px-4 py-16">
      <div className="flex flex-col items-center gap-6 max-w-md">
        <div className="flex items-center justify-center w-40 h-40">
          <SearchGlobal className="w-full h-full" />
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-xs font-semibold leading-relaxed">
            You haven&apos;t created any services yet.
          </p>
          <p className="text-xs font-semibold leading-relaxed">
            Add a new service to get started.
          </p>
        </div>
        <Button icon={<Plus />} onClick={() => openModal()}>
          Add new service
        </Button>
      </div>
    </div>
  );
};
