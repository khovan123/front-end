import QUESTIONS from "../questions";
export default function Answers({
  answers,
  onselectedAnswer,
  answerState,
  selectedAnswer,
  questionsAnswers,
}) {
  // if (answerState === "correct") {
  //   classes = classes + "correct";
  // } else if (answerState === "wrong") {
  //   classes = classes + "wrong";
  // }
  return (
    <ul id="answers">
      {answers.map((answer) => {
        let classes = "";
        if (selectedAnswer === answer) {
          if (answerState === "selected") {
            classes = answerState;
          }
          if (answerState === "wrong" || answerState === "correct") {
            classes = answerState;
          }
        } else if (answerState === "notyet" && answer === questionsAnswers[0]) {
          classes = "wrong";
        }
        return (
          <li className="answer" key={answer}>
            <button
              className={classes}
              onClick={() => {
                onselectedAnswer(answer);
              }}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
