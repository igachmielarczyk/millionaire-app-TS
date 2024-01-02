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


// export interface SoundState {
//   letsPlay: () => void;
//   stopLetsPlay: () => void;
//   correctAnswer: () => void;
//   stopCorrectAnswer: () => void;
//   wrongAnswer: () => void
//   stopWrongAnswer: () => void;
//   isMuted: boolean;
//   toggleMute: () => void;
// }

// export const useSoundStore = create<SoundState>((set) => ({
//   letsPlay: () => {},
//   stopLetsPlay: () => {},
//   correctAnswer: () => {},
//   stopCorrectAnswer: () => {},
//   wrongAnswer: () => {},
//   stopWrongAnswer: () => {},
//   isMuted: false,
//   toggleMute: () => set((state) => ({ isMuted: !state.isMuted})),

//   // Function that initializes the sound state
//   initSounds: () => {
//     const [letsPlay, { stop: stopLetsPlay }] = useSound(playSound);
//     const [correctAnswer, { stop: stopCorrectAnswer }] = useSound(correctSound);
//     const [wrongAnswer, { stop: stopWrongAnswer }] = useSound(wrongSound);

//     set(() => ({
//       letsPlay,
//       stopLetsPlay,
//       correctAnswer,
//       stopCorrectAnswer,
//       wrongAnswer,
//       stopWrongAnswer,
//     }));
//   },


// }));

// Inicjalizacja stanu dźwięku
// const soundStore = useSoundStore.getState();
// soundStore.initSounds();
