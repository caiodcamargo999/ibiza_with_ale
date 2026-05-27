import { create } from 'zustand';

interface FormStore {
  isOpen: boolean;
  selectedPackage: string | null;
  openForm: (pkg?: string) => void;
  closeForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  isOpen: false,
  selectedPackage: null,
  openForm: (pkg) => set({ isOpen: true, selectedPackage: pkg || null }),
  closeForm: () => set({ isOpen: false, selectedPackage: null }),
}));
