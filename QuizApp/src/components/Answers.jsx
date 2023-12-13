export default function Answers({
  answers,
  onselectedAnswer,
  answerState,
  selectedAnswer,
  answerResult,
}) {
  return (
    <ul id="answers">
      {answers.map((answer) => {
        let classes = "";
        if (selectedAnswer === answer) {
          if (answerState === "answered") {
            classes = "selected";
          }
          if (answerState === "wrong" || answerState === "correct") {
            classes = answerState;
          }
        } else if (answerState === "notyet" && answer === answerResult) {
          classes = "wrong";
        }
        return (
          <li className="answer" key={answer}>
            <button
              className={classes}
              onClick={() => {
                onselectedAnswer(answer);
              }}
              disabled={selectedAnswer !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
