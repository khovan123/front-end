export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.Square.row}${turn.Square.col}`}>
          {turn.Player} selected {turn.Square.row},{turn.Square.col}
        </li>
      ))}
    </ol>
  );
}
