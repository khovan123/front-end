import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import quizcomplete from "../assets/quiz-complete.png";
const TIMER = +10000;
export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [answerState, setAnswerState] = useState("");
  const activeQuestion =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      if (selectedAnswer === null) {
        console.log("not yet");
        setAnswerState("notyet");
        setUserAnswers((prev) => {
          return [...prev, selectedAnswer];
        });
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      } else {
        setAnswerState("selected");
        setUserAnswers((prev) => {
          return [...prev, selectedAnswer];
        });
        setTimeout(() => {
          if (selectedAnswer === QUESTIONS[activeQuestion].answers[0]) {
            setAnswerState("correct");
          } else {
            setAnswerState("wrong");
          }
          setTimeout(() => {
            setAnswerState("");
          }, 2000);
        }, 1000);
      }
    },
    [activeQuestion]
  );

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (activeQuestion === QUESTIONS.length) {
    return (
      <div id="summary">
        <img src={quizcomplete} alt="this image is quiz complete" />
      </div>
    );
  }

  return (
    <section id="quiz">
      <Question
        key={activeQuestion}
        timer={TIMER}
        onSkipAnswer={handleSkipAnswer}
        onSelectAnswer={handleSelectAnswer}
        questionsText={QUESTIONS[activeQuestion].text}
        questionsAnswers={QUESTIONS[activeQuestion].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[activeQuestion]}
      />
    </section>
  );
}
