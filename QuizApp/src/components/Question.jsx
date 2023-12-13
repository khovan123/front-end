import { useEffect, useRef, useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";
export default function Question({ index, onSkipAnswer, onSelectAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });
  const shuffleAnswers = useRef();
  if (!shuffleAnswers.current) {
    shuffleAnswers.current = [...QUESTIONS[index].answers];
    shuffleAnswers.current.sort(() => Math.random() - 0.5);
  }
  let timer = 10000;
  if (answer.selectedAnswer !== "") {
    timer = 1000;
  }
  if (answer.selectedAnswer !== "" && answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answerButton) {
    if (answerButton) {
      setAnswer({
        selectedAnswer: answerButton,
        isCorrect: null,
      });

      setTimeout(() => {
        setAnswer({
          selectedAnswer: answerButton,
          isCorrect: answerButton === QUESTIONS[index].answers[0],
        });

        setTimeout(() => {
          onSelectAnswer(answerButton);
        }, 2000);
      }, 1000);
    }
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timer={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={shuffleAnswers.current}
        onselectedAnswer={handleSelectAnswer}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
        answerResult={QUESTIONS[index].answers[0]}
      />
    </div>
  );
}
