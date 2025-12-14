import { Service } from '@/types/service';

const STORAGE_KEY = 'services_data';

export const storageService = {
  get: (): Service[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return [];
    }
  },

  set: (services: Service[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },

  clear: (): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  },
};

