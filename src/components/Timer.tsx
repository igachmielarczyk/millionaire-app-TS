import { useEffect, useState } from "react"

interface Props {
  setStop: (value: boolean) => void;
  questionNumber: number;
  wrongAnswer: any
}

const Timer = ({setStop, questionNumber, wrongAnswer}: Props) => {
  const [timer, setTimer] = useState(30)

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

    // Cleanup: Zatrzymaj interwał po odmontowaniu komponentu
    return () => clearInterval(interval);
  }, [setStop, timer]); 

  useEffect(() => {
    setTimer(30)
  }, [questionNumber])

  return timer;
}

export default Timer