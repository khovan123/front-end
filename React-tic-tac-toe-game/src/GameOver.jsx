export default function GameOver({ winner, onRestart }) {
  return (
    <div id="game-over">
      <h2>GAME OVER!</h2>
      {winner && <p>You win {winner}!</p>}
      {!winner && <p>It's draw!</p>}
      <button onClick={onRestart}>Rematch</button>
    </div>
  );
}
