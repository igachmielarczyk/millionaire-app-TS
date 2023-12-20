import { create } from 'zustand';

export type HalfState = {
  showHalf: boolean;
  toggleHalf: () => void;
};

export const halfStore = create<HalfState>((set) => ({
  showHalf: false,
  toggleHalf: () => set((state) => ({ showHalf: !state.showHalf })),
}));
export type PhoneState = {
  showPhone: boolean;
  togglePhone: () => void;
};

export const phoneStore = create<PhoneState>((set) => ({
  showPhone: false,
  togglePhone: () => set((state) => ({ showPhone: !state.showPhone})),
}));