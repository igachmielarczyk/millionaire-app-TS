import { useEffect, useState } from "react";

interface Props {
  allQuestion: Question[];
  setStop: (value: boolean) => void;
  setQuestionNumber: (value: number) => void;
  questionNumber: number;
  wrongAnswer: any;
  correctAnswer: any;
  letsPlay: any;
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
    setSelectedAnswer(answer);
    setClassName("answer active");
    // dlaczego tutaj uzywam funkcji strzalkowej po duratin
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

  return (
    <div className="trivia">
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
