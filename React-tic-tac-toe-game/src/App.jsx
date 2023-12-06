import { useState } from "react";
import GameBoard from "./GameBoard";
import Player from "./Player";
import "./index.css";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INTITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function DriveCurrentActive(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && "X" === gameTurns[0].Player) {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function DriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firtSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];
    if (
      firtSquare &&
      firtSquare === secondSquare &&
      firtSquare == thirdSquare
    ) {
      winner = players[firtSquare];
    }
  }
  return winner;
}
function DriveGameBoard(gameBoard, gameTurns) {
  for (const turn of gameTurns) {
    const { Square, Player } = turn;
    const { row, col } = Square;
    gameBoard[row][col] = Player;
  }
  return gameBoard;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  const activePlayer = DriveCurrentActive(gameTurns);
  let gameBoard = [...INTITIAL_GAMEBOARD.map((innerArray) => [...innerArray])];
  gameBoard = DriveGameBoard(gameBoard, gameTurns);
  let winner = DriveWinner(gameBoard, players);
  let hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = DriveCurrentActive(prevTurns);
      const updatedTurns = [
        { Square: { row: rowIndex, col: colIndex }, Player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  function handleReset() {
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="hightlight-player">
          <Player
            intitialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            intitialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleReset} />
        )}
      </div>

      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
