import { create } from 'zustand';
import useSound from 'use-sound';
import playSound from '../assets/sounds/play.mp3';
import correctSound from '../assets/sounds/correct.mp3';
import wrongSound from '../assets/sounds/wrong.mp3';

export interface SoundState {
  letsPlay: () => void;
  stopLetsPlay: () => void;
  correctAnswer: () => void;
  stopCorrectAnswer: () => void;
  wrongAnswer: () => void
  stopWrongAnswer: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

export const useSoundStore = create<SoundState>((set) => ({
  letsPlay: () => {},
  stopLetsPlay: () => {},
  correctAnswer: () => {},
  stopCorrectAnswer: () => {},
  wrongAnswer: () => {},
  stopWrongAnswer: () => {},
  isMuted: false,

  // Function that initializes the sound state
  initSounds: () => {
    const [letsPlay, { stop: stopLetsPlay }] = useSound(playSound);
    const [correctAnswer, { stop: stopCorrectAnswer }] = useSound(correctSound);
    const [wrongAnswer, { stop: stopWrongAnswer }] = useSound(wrongSound);

    set(() => ({
      letsPlay,
      stopLetsPlay,
      correctAnswer,
      stopCorrectAnswer,
      wrongAnswer,
      stopWrongAnswer,
    }));
  },

  toggleMute: () =>
    set((state) => ({
      isMuted: !state.isMuted,
    })),
}));

// Inicjalizacja stanu dźwięku
// const soundStore = useSoundStore.getState();
// soundStore.initSounds();
