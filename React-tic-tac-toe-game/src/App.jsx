import { useState } from "react";
import GameBoard from "./GameBoard";
import Player from "./Player";
import "./index.css";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const intitialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function DriveCurrentACtive(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && "X" === gameTurns[0].Player) {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = DriveCurrentACtive(gameTurns);

  let gameBoard = [...intitialGameBoard];
  let winner;
  for (const turn of gameTurns) {
    const { Square, Player } = turn;
    const { row, col } = Square;
    gameBoard[row][col] = Player;
  }
  for (const combination of WINNING_COMBINATIONS) {
    const firtSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (
      firtSquare &&
      firtSquare === secondSquare &&
      firtSquare == thirdSquare
    ) {
      winner = firtSquare;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = DriveCurrentACtive(prevTurns);
      const updatedTurns = [
        { Square: { row: rowIndex, col: colIndex }, Player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="hightlight-player">
          <Player
            intitialName={"Player 1"}
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            intitialName={"Player 2"}
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You win, {winner}!</p>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
