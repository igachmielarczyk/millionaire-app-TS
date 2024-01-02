import { useEffect, useState } from "react";
import stopTimerSubject from "../rxjs/stopTimerSubject";
import { useSoundStore } from '../store/sound.store';

interface Props {
  setStop: (value: boolean) => void;
  questionNumber: number;
  wrongAnswer: any
  stopWrongAnswer: any
}


const Timer = ({setStop, questionNumber, wrongAnswer, stopWrongAnswer}: Props) => {
  const [timer, setTimer] = useState(30);
  const { isMuted } = useSoundStore();

  useEffect(() => {
    const handleTimerEnd = () => {
      if (!isMuted) {
        wrongAnswer();
      } else {
        stopWrongAnswer();
      }
    };

    if (timer === 0) return (setStop(true), handleTimerEnd())
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    const subscription = stopTimerSubject.subscribe(() => {
      clearInterval(interval)
    });

    return () => clearInterval(interval);
    subscription.unsubscribe();
  }, [setStop, timer, wrongAnswer]); 

  useEffect(() => {
    setTimer(30)
  }, [questionNumber])

  return timer;
}

export default Timer