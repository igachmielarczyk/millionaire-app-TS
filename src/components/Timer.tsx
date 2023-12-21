import { useEffect, useState } from "react";
import stopTimerSubject from "../rxjs/stopTimerSubject";

interface Props {
  setStop: (value: boolean) => void;
  questionNumber: number;
  wrongAnswer: any;
}
const Timer = ({ setStop, questionNumber, wrongAnswer }: Props) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setStop(true), wrongAnswer();
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
      clearInterval(interval);
    });

    return () => clearInterval(interval);
    subscription.unsubscribe();
  }, [setStop, timer, wrongAnswer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};

export default Timer;
