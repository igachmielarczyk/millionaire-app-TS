import { create } from 'zustand';
import useSound from 'use-sound';


export interface SoundState {
  isMuted: boolean;
  toggleMute: () => void;
}

export const useSoundStore = create<SoundState>((set) => ({
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted})),
}));
