import { StateCreator } from "zustand";

export interface ModalSlice {
  isOpen: boolean;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
}

export const createModalSlice: StateCreator<ModalSlice, [], [], ModalSlice> = (
  set
) => ({
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set(() => ({ isOpen: open })),
});
