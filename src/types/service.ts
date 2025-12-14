import { ServiceFormData } from '@/schemas/service-schema';

export type Service = ServiceFormData & {
  id: string;
};

