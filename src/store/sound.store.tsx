import { create } from 'zustand'
import useSound from "use-sound";
import play from "./assets/sounds/play.mp3";
import correct from "./assets/sounds/correct.mp3";
import wrong from "./assets/sounds/wrong.mp3";

export interface SoundProps {
  wrongAnswer: any;
  correctAnswer: any;
  letsPlay: any;
}

export const soundStore = create<SoundProps>(
console.log('anna');

)