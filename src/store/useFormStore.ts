import { create } from 'zustand';

interface FormStore {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
}

export const useFormStore = create<FormStore>((set) => ({
  isOpen: false,
  openForm: () => set({ isOpen: true }),
  closeForm: () => set({ isOpen: false }),
}));
