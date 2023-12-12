import quizlogo from "../assets/quiz-logo.png";
export default function Header() {
  return (
    <header>
      <img src={quizlogo} alt="this image is quiz logo" />
      <h1>React Quiz App</h1>
    </header>
  );
}
