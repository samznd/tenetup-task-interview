'use client';

import { Controller } from 'react-hook-form';
import { Modal } from '@/components/shared/ui/modal';
import { Button } from '@/components/shared/ui/button';
import { Select } from '@/components/shared/ui/select';
import { Input } from '@/components/shared/ui/input';
import { useServiceForm } from '@/hooks/use-service-form';
import { ServiceInfoBanner } from './service-info-banner';
import { LoadingOverlay } from '@/components/shared/ui/loading-overlay';
import { SERVICE_TYPES } from '@/constants/services';

interface ServiceModalContentProps {
  show?: boolean;
  onClose?: () => void;
  editingServiceId?: string | null;
}

export const ServiceModalContent = ({ show, onClose, editingServiceId }: ServiceModalContentProps) => {
  const { control, handleSubmit, serviceType, isValid, onSubmit, getError, isSubmitting } = useServiceForm(editingServiceId);

  return (
    <>
      <LoadingOverlay isLoading={isSubmitting} message={editingServiceId ? 'Updating service...' : 'Creating service...'} />
      <Modal
      show={show}
      title={editingServiceId ? 'Edit Service' : 'Add New Service'}
      onClose={onClose}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!isValid || !serviceType || isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {!serviceType && <ServiceInfoBanner />}

        <Controller
          name="serviceType"
          control={control}
          render={({ field }) => (
            <Select
              label="select service type"
              placeholder="Select..."
              options={SERVICE_TYPES}
              value={field.value}
              onChange={field.onChange}
              error={getError('serviceType')}
              labelClassName="block text-sm font-medium text-gray-700"
            />
          )}
        />

        {serviceType && (
          <Controller
            name="hardDisk"
            control={control}
            render={({ field }) => (
              <Input
                label="Hard Disk (GB)"
                placeholder=""
                required
                {...field}
                error={getError('hardDisk')}
                helperText={serviceType === 'hosting' ? 'Recommended >= 10GB' : 'Minimum 20GB'}
              />
            )}
          />
        )}

        {serviceType === 'hosting' && (
          <>
            <Controller
              name="emailAccounts"
              control={control}
              render={({ field }) => (
                <Input
                  label="Email Account"
                  placeholder=""
                  required
                  {...field}
                  error={getError('emailAccounts')}
                  helperText="Number of email accounts"
                />
              )}
            />

            <Controller
              name="addonDomains"
              control={control}
              render={({ field }) => (
                <Input
                  label="Addon Domain"
                  placeholder=""
                  required
                  {...field}
                  error={getError('addonDomains')}
                  helperText="Number of addon domains"
                />
              )}
            />
          </>
        )}

        {serviceType === 'vps' && (
          <>
            <Controller
              name="ram"
              control={control}
              render={({ field }) => (
                <Input
                  label="RAM (GB)"
                  placeholder=""
                  required
                  {...field}
                  error={getError('ram')}
                />
              )}
            />

            <Controller
              name="cpuCount"
              control={control}
              render={({ field }) => (
                <Input
                  label="CPU Count"
                  placeholder=""
                  required
                  {...field}
                  error={getError('cpuCount')}
                  helperText="Number of CPU Cores"
                />
              )}
            />
          </>
        )}

        {serviceType && (
          <Controller
            name="bandwidth"
            control={control}
            render={({ field }) => (
              <Input
                label="Bandwidth (GB)"
                placeholder=""
                required
                {...field}
                error={getError('bandwidth')}
                helperText="can be -1 or bigger than 1, zero not allowed"
              />
            )}
          />
        )}
      </form>
    </Modal>
    </>
  );
};

