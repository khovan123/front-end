import { useState } from "react";
import GameBoard from "./GameBoard";
import Player from "./Player";
import "./index.css";
import Log from "./Log";
function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);
  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currentActivePlayer) =>
      currentActivePlayer === "X" ? "O" : "X"
    );
    setGameTurns((prevTurns) => {
      const updatedTurns = [
        { Square: { row: rowIndex, col: colIndex }, Player: activePlayer },
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
