'use client';

import { CircleAlert } from 'lucide-react';

export const ServiceInfoBanner = () => {
  return (
    <div className="flex items-center gap-2 bg-info/10 p-4 rounded-lg border border-info">
      <CircleAlert className="text-xl text-info" />
      <label htmlFor="select-service-type" className="text-sm text-info font-semibold">
        to create a new service please select service type
      </label>
    </div>
  );
};

