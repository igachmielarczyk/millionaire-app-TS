import { useEffect, useState } from "react";
import stopTimerSubject from "../rxjs/stopTimerSubject";
import { halfStore, phoneStore } from "../store/wheel.store";

interface Props {
  allQuestion: Question[];
  setStop: (value: boolean) => void;
  setQuestionNumber: (value: number) => void;
  questionNumber: number;
  wrongAnswer: any;
  correctAnswer: any;
  letsPlay: any;
  showHalfAnswers: boolean;
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

const Trivia = ({
  allQuestion,
  setStop,
  setQuestionNumber,
  questionNumber,
  wrongAnswer,
  correctAnswer,
  letsPlay,
}: Props) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [className, setClassName] = useState("answer");

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    if (
      allQuestion &&
      questionNumber > 0 &&
      questionNumber <= allQuestion.length
    ) {
      const shuffledAnswers = shuffleAnswers(allQuestion[questionNumber - 1]);
      setCurrentQuestion({
        ...allQuestion[questionNumber - 1],
        answers: shuffledAnswers,
      });
    }
  }, [allQuestion, questionNumber]);

  const shuffleAnswers = (question: Question) => {
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    const shuffled = allAnswers.sort(() => Math.random() - 0.5);

    const answersWithFlags = shuffled.map((answer) => {
      return {
        answer,
        isCorrect: answer === question.correct_answer,
        className: answer === question.correct_answer ? "correct-answer" : "",
      };
    });

    return answersWithFlags;
  };

  const delay = (duration: number | undefined, callback: () => void) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (answer: Answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setClassName("answer active");
      stopTimerSubject.next();
      // dlaczego tutaj uzywam funkcji strzalkowej po duration
      delay(3000, () => {
        setClassName(answer.isCorrect ? "answer correct" : "answer wrong");
      });
      delay(5000, () => {
        if (answer.isCorrect) {
          correctAnswer();

          delay(1000, () => {
            setQuestionNumber((prev: number) => prev + 1);
            setSelectedAnswer(null);
          });
        } else {
          wrongAnswer();
          delay(1000, () => {
            setStop(true);
          });
        }
      });
    }

      if (showHalf) {
        const timerHalf = setTimeout(() => {
          toggleHalf();
        }, 6000);
        return () => clearTimeout(timerHalf);
      }
      if (showPhone) {
        const timerPhone = setTimeout(() => {
          togglePhone();
        }, 6000);
        return () => clearTimeout(timerPhone);
      }

  };

  const { showHalf,toggleHalf } = halfStore();
  const {showPhone, togglePhone} = phoneStore()

  const [answersToShow, setAnswersToShow] = useState<Answer[]>([]);
  
  useEffect(() => {
    if (currentQuestion && showHalf) {
      const { correct_answer, incorrect_answers } = currentQuestion;

      const randomIncorrectIndex = Math.floor(
        Math.random() * incorrect_answers.length
      );
      const selectedIncorrectAnswer = incorrect_answers[randomIncorrectIndex];

      const newAnswersToShow: Answer[] = [
        { answer: correct_answer, isCorrect: true, className: "correct-answer" },
        { answer: selectedIncorrectAnswer, isCorrect: false, className: "" }
      ];
      setAnswersToShow(newAnswersToShow);
    }
  }, [currentQuestion, showHalf]);


  return (
    <div className="trivia">
      {currentQuestion && (
        <div className="question">{currentQuestion.question}</div>
      )}
<div className="answers">
  {(showHalf ? answersToShow : currentQuestion?.answers)?.map(
    (answer, index) => (
      <div
        className={
          selectedAnswer === answer
            ? className
            : `answer ${answer.className} ${answer.isCorrect && showPhone ? 'phone-answer' : ''}`
        }
        key={index}
        onClick={(_event: React.MouseEvent<HTMLDivElement>) =>
          handleClick(answer)
        }
      >
        {answer.isCorrect ? <strong>{answer.answer}</strong> : answer.answer}
      </div>
    )
  )}
</div>
      {/* {!showHalf ? (
        <div className="answers">
          {currentQuestion?.answers?.map((answer, index) => (
            <div
              className={
                answersToShow === answer
                  ? className
                  : `answer ${answer.className}`
              }
              key={index}
              onClick={(_event: React.MouseEvent<HTMLDivElement>) =>
                handleClick(answer)
              }
            >
              {answer.isCorrect ? (
                <strong>{answer.answer}</strong>
              ) : (
                answer.answer
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="answers">
          {currentQuestion?.answers?.map((answer, index) => (
            <div
              className={
                selectedAnswer === answer
                  ? className
                  : `answer ${answer.className}`
              }
              key={index}
              onClick={(_event: React.MouseEvent<HTMLDivElement>) =>
                handleClick(answer)
              }
            >
              {answer.isCorrect ? (
                <strong>{answer.answer}</strong>
              ) : (
                answer.answer
              )}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Trivia;
