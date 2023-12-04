import { useEffect, useState } from "react";
import { moneyPyramid } from "./dataPyramid";
import axios from "axios";
// import { createQuizData as quizData } from './api/opentdb'

// components
import Trivia from "./components/Trivia";
import ListPyramid from "./components/ListPyramid";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const App = () => {
  const [questionNumber, setQuestionNumber] = useState(5);
  const [question, setQestion] = useState<Question>();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=15&type=multiple")
      .then((res) => {
        setQestion(res.data.results);
      })
      .catch((err) => console.log(err));
  });

  console.log(question);

  return (
    <>
      <div className="app">
        <div className="main">
          <div className="top">
            <div className="timer">30</div>
          </div>
          <div className="bottom">
            <Trivia />
          </div>
        </div>
        <div className="pyramid">
          <ul className="moneyList">
            {moneyPyramid.map((m) => (
              <ListPyramid key={m.id} m={m} questionNumber={questionNumber} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
