import quizcomplete from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
export default function Summary({ userAnswers }) {
  const answerSkipped = userAnswers.filter((answer) => answer === null);
  const answerCorrect = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );
  const answerCorrectShare = answerCorrect.length;
  const answerSkippedShare = answerSkipped.length;
  const answerWrongShare =
    userAnswers.length - answerCorrectShare - answerSkippedShare;
  return (
    <div id="summary">
      <img src={quizcomplete} alt="this image is quiz complete" />
      <h2>Result</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {Math.round((answerSkippedShare / userAnswers.length) * 100)}%
          </span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">
            {Math.round((answerCorrectShare / userAnswers.length) * 100)}%
          </span>
          <span className="text">Correct</span>
        </p>
        <p>
          <span className="number">
            {Math.round((answerWrongShare / userAnswers.length) * 100)}%
          </span>
          <span className="text">Wrong</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";
          if (answer === QUESTIONS[index].answers[0]) {
            cssClass += " correct";
          } else if (answer === null) {
            cssClass += " skipped";
          } else if (answer !== QUESTIONS[index].answers[0]) {
            cssClass += " wrong";
          }
          return (
            <li key={index}>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClass}>{answer ?? "Skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
