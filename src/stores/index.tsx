import { create } from "zustand";
import { createModalSlice, ModalSlice } from "./modalSlice";

export const useStore = create<ModalSlice>()((...a) => ({
  ...createModalSlice(...a),
}));
