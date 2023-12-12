import { useRef } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
export default function Question({
  timer,
  onSkipAnswer,
  onSelectAnswer,
  questionsText,
  questionsAnswers,
  answerState,
  selectedAnswer,
}) {
  const shuffleAnswers = useRef();
  if (!shuffleAnswers.current) {
    shuffleAnswers.current = [...questionsAnswers];
    shuffleAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <div id="question">
      <QuestionTimer timer={timer} onTimeOut={onSkipAnswer} />
      <h2>{questionsText}</h2>
      <Answers
        answers={shuffleAnswers.current}
        onselectedAnswer={onSelectAnswer}
        answerState={answerState}
        selectedAnswer={selectedAnswer}
        questionsAnswers={questionsAnswers}
      />
    </div>
  );
}
