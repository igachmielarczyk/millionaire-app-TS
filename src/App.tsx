import { useEffect, useRef, useState } from "react";
import { moneyPyramid } from "./dataPyramid";
import useFetchData from "./api";
import { halfStore, phoneStore } from "./store/wheel.store";
import { useSoundStore, SoundState } from "./store/sound.store";

import useSound from "use-sound";
import play from "./assets/sounds/play.mp3";
import correct from "./assets/sounds/correct.mp3";
import wrong from "./assets/sounds/wrong.mp3";

// components
import Trivia from "./components/Trivia";
import ListPyramid from "./components/ListPyramid";
import Timer from "./components/Timer";

// icons
import { GoUnmute } from "react-icons/go";
import { IoVolumeMuteOutline } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

type Questions = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}[];

const App = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [showHalfAnswers, setShowHalfAnswers] = useState(false);
  const [showPhoneAnswers, setShowPhoneAnswers] = useState(false);

  // sound
  const [letsPlay, { stop: stopLetsPlay }] = useSound(play);
  const [correctAnswer, { stop: stopCorrectAnswer }] = useSound(correct);
  const [wrongAnswer, { stop: stopWrongAnswer }] = useSound(wrong);

  // store Wheel
  const {  toggleHalf } = halfStore();
  const {  togglePhone } = phoneStore();

  // fetch Question
  const { allQuestion } = useFetchData(stop);

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  // add name
  const inputRef = useRef<string | null>(null);
  const handleClickInput = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  // play Again

  const handleClickStartAgain = () => {
    setQuestionNumber(1);
    setStop(false);
    allQuestion<Questions[]>;
    setEarned("$ 0");
    halfStore.getState().showHalf = false;
    phoneStore.getState().showPhone = false;
    setShowHalfAnswers(false);
    setShowPhoneAnswers(false);
  };

  // Lifebuoyes Function

  const handleWheelHalf = () => {
    toggleHalf();
    setShowHalfAnswers(true);
  };
  const handleWheePhone = () => {
    togglePhone();
    setShowPhoneAnswers(true);
  };

  // Mute sounds

  const { isMuted, toggleMute } = useSoundStore();

  const handleMuteToggle = () => {
    toggleMute();
    console.log(useSoundStore.getState().isMuted);
    if (!isMuted) {
      stopLetsPlay();
      stopCorrectAnswer();
      stopWrongAnswer();
    }
  };

  return (
    <>
      <div className="app">
        <div className="mute" onClick={handleMuteToggle}>
          {isMuted ? <IoVolumeMuteOutline /> : <GoUnmute />}
        </div>
        {questionNumber < 16 ? (
          username ? (
            <>
              <div className="main">
                {stop ? (
                  <div className="loss">
                    <h1 className="earnedText">You earned: {earned}</h1>
                    <button
                      className="startAgain"
                      onClick={handleClickStartAgain}
                    >
                      Start Again
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="top">
                      <div className="timer">
                        <Timer
                          setStop={setStop}
                          questionNumber={questionNumber}
                          wrongAnswer={wrongAnswer}
                          stopWrongAnswer={stopWrongAnswer}
                        />
                      </div>
                    </div>
                    <div className="bottom">
                      {allQuestion !== null && allQuestion.length > 0 && (
                        <Trivia
                          allQuestion={allQuestion}
                          setStop={setStop}
                          setQuestionNumber={setQuestionNumber}
                          questionNumber={questionNumber}
                          letsPlay={letsPlay}
                          correctAnswer={correctAnswer}
                          wrongAnswer={wrongAnswer}
                          stopLetsPlay={stopLetsPlay}
                          stopCorrectAnswer={stopCorrectAnswer}
                          stopWrongAnswer={stopWrongAnswer}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="pyramid">
                <div className="lifebuoys">
                  <div
                    className={`wheel ${showHalfAnswers ? "disable" : ""}`}
                    onClick={handleWheelHalf}
                  >
                    50:50
                  </div>
                  <div
                    className={`wheel ${showPhoneAnswers ? "disable" : ""}`}
                    onClick={handleWheePhone}
                  >
                    <FaPhoneAlt />
                  </div>
                </div>
                <ul className="moneyList">
                  <h2>Player: {username}</h2>
                  {moneyPyramid.map((m) => (
                    <ListPyramid
                      key={m.id}
                      m={m}
                      questionNumber={questionNumber}
                    />
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="start">
                <input
                  type="text"
                  placeholder="enter your name"
                  className="startInput"
                  ref={inputRef}
                />
                <button className="startButton" onClick={handleClickInput}>
                  Start
                </button>
              </div>
            </>
          )
        ) : (
          <>
            <div className="win start">
              <div className="text">
                <h1>{username}</h1>
                <h2>you are a millionaire</h2>
              </div>

              <button className="startButton" onClick={handleClickStartAgain}>
                Start Again
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;
