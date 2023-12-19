import { useEffect, useState } from "react";
import stopTimerSubject from "../rxjs/stopTimerSubject";

interface Props {
  allQuestion: Question[];
  setStop: (value: boolean) => void;
  setQuestionNumber: (value: number) => void;
  questionNumber: number;
  wrongAnswer: any;
  correctAnswer: any;
  letsPlay: any;
  // kola ratunkowe
  // handleWheelHalf: (question: Question, correctAnswer: string, incorrectAnswers: string[]) => void;
}

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers?: Answer[];
};

type Answer = {
  answer: string;
  isCorrect: boolean;
  className?: string;
};

const Trivia = ({ allQuestion, setStop, setQuestionNumber, questionNumber, wrongAnswer, correctAnswer, letsPlay}: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [className, setClassName] = useState("answer")

  useEffect(() => {
    letsPlay()
  },[letsPlay])

  useEffect(() => {
    if (allQuestion && questionNumber > 0 && questionNumber <= allQuestion.length) {
      const shuffledAnswers = shuffleAnswers(allQuestion[questionNumber - 1]);
      setCurrentQuestion({ ...allQuestion[questionNumber - 1], answers: shuffledAnswers });
    }
  }, [allQuestion, questionNumber]);

  const shuffleAnswers = (question: Question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);

    const answersWithFlags = shuffled.map(answer => {
      return {
        answer,
        isCorrect: answer === question.correct_answer,
        className: answer === question.correct_answer ? 'correct-answer' : '',
        
      };
    });

    return answersWithFlags;
    
  };

  const delay = (duration: number | undefined, callback: () => void) => {
    setTimeout(() => {
      callback()
    }, duration)
  }

  const handleClick = (answer: Answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setClassName("answer active");
      stopTimerSubject.next();
      // dlaczego tutaj uzywam funkcji strzalkowej po duration
      delay(3000, () => {
        setClassName(answer.isCorrect ? "answer correct" : "answer wrong")
      })
      delay(5000, () => {
        if(answer.isCorrect) {
          correctAnswer()

          delay(1000, ()=> {
            setQuestionNumber((prev: number) => prev + 1);
            setSelectedAnswer(null)
            
          })
  
        } else {
          wrongAnswer()
          delay(1000, () =>{ 
            
            setStop(true)
          })
        }
      })
    }
  }

  // wheel function
  // kola ratunkowe

  // const wheelHalf = () => {
  //   if (currentQuestion) {
  //     const { correct_answer, incorrect_answers } = currentQuestion;
  //     const randomIncorrectIndex = Math.floor(Math.random() * incorrect_answers.length);
  //     // handleWheelHalf(currentQuestion, correct_answer, [
  //     //   ...incorrect_answers.slice(randomIncorrectIndex, randomIncorrectIndex + 1),
  //     //   correct_answer,
  //     // ]);
  //   }
  // };

// działające koło ratukowe ale w Trivia
  // const wheelHalf = () => {
  //   if (currentQuestion) {
  //     const { correct_answer, incorrect_answers } = currentQuestion;
  //     const randomIncorrectIndex = Math.floor(Math.random() * incorrect_answers.length);
  //     const selectedIncorrectAnswer = incorrect_answers[randomIncorrectIndex];
  //     const answersToShow = [correct_answer, selectedIncorrectAnswer];
  //     console.log(answersToShow); 
  //   }
  // };

  return (
    <div className="trivia">
      {/* działające koło ale w Trviia i nie wiem jak zmienić wyświetlanie */}
      {/* <div className="wheel" onClick={wheelHalf}>
      50:50
      </div> */}
      {currentQuestion && (
        <div className="question">
          {currentQuestion.question}
        </div>
      )}
      <div className="answers">
        {currentQuestion?.answers?.map((answer, index) => (
          <div className={selectedAnswer === answer ? className : `answer ${answer.className}`} key={index} onClick={(_event: React.MouseEvent<HTMLDivElement>) => handleClick(answer)}>
            {answer.isCorrect ? <strong>{answer.answer}</strong> : answer.answer}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
