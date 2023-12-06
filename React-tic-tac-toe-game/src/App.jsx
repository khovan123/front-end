import { useState } from "react";
import GameBoard from "./GameBoard";
import Player from "./Player";
import "./index.css";
import Log from "./Log";

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
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
