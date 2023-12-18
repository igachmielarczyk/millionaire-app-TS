import { useEffect, useState } from "react";
import stopTimerSubject from "../rxjs/stopTimerSubject";


interface Props {
  setStop: (value: boolean) => void;
  questionNumber: number;
  wrongAnswer: any
}



const Timer = ({setStop, questionNumber, wrongAnswer,}: Props) => {
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer === 0) return (setStop(true), wrongAnswer())
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval); // Zatrzymaj interwał, gdy timer osiągnie 0
          return prev;
        }
        return prev - 1;
      });
    }, 1000);

    const subscription = stopTimerSubject.subscribe(() => {
      clearInterval(interval)
    });


    // Cleanup: Zatrzymaj interwał po odmontowaniu komponentu
    return () => clearInterval(interval);
    subscription.unsubscribe();
  }, [setStop, timer, wrongAnswer]); 

  useEffect(() => {
    setTimer(10)
  }, [questionNumber])

  return timer;
}

export default Timer