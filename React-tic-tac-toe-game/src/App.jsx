import Player from "./Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player intitialName={"Player 1"} symbol={"X"} />
          <Player intitialName={"Player 2"} symbol={"O"} />
        </ol>
      </div>
    </main>
  );
}

export default App;
