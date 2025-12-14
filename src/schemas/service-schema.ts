import { z } from 'zod';

export const hostingSchema = z.object({
  serviceType: z.literal('hosting'),
  hardDisk: z
    .string()
    .min(1, 'Hard Disk is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 10,
      {
        message: 'Hard Disk must be a number and minimum 10 GB',
      }
    ),
  emailAccounts: z
    .string()
    .min(1, 'Email Accounts is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1,
      {
        message: 'Email Accounts must be numeric and minimum 1 account',
      }
    ),
  addonDomains: z
    .string()
    .min(1, 'Addon Domains is required')
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && (num >= 0 || num === -1);
      },
      {
        message: 'Addon Domains must be numeric, minimum 0 (or -1 for special cases)',
      }
    ),
  bandwidth: z
    .string()
    .min(1, 'Bandwidth is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      {
        message: 'Bandwidth must be numeric and minimum 0',
      }
    ),
    id: z.string().optional(),
});

export const vpsSchema = z.object({
  serviceType: z.literal('vps'),
  hardDisk: z
    .string()
    .min(1, 'Hard Disk is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 20,
      {
        message: 'Hard Disk must be a number and minimum 20 GB',
      }
    ),
  ram: z
    .string()
    .min(1, 'RAM is required')
    .refine(
      (val) => {
        const num = Number(val);
        return !isNaN(num) && num > 0;
      },
      {
        message: 'RAM must be numeric, cannot be 0, unit in GB',
      }
    ),
  cpuCount: z
    .string()
    .min(1, 'CPU Count is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1,
      {
        message: 'CPU Count must be numeric and minimum 1 core',
      }
    ),
  bandwidth: z
    .string()
    .min(1, 'Bandwidth is required')
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      {
        message: 'Bandwidth must be numeric and minimum 0',
      }
    ),
    id: z.string().optional(),

});

export const serviceSchema = z.discriminatedUnion('serviceType', [
  hostingSchema,
  vpsSchema,
]);

export type ServiceFormData = z.infer<typeof serviceSchema>;
export type HostingFormData = z.infer<typeof hostingSchema>;
export type VPSFormData = z.infer<typeof vpsSchema>;

