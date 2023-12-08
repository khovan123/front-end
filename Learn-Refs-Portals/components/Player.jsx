import { useRef, useState } from "react";

export default function Player() {
  const player = useRef();
  const [enteredPlayerName, SetEnteredPlayerName] = useState(null);
  function handleClick() {
    SetEnteredPlayerName(player.current.value);
    player.current.value = "";
  }
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" required ref={player} value={enteredPlayerName} />
        <button onClick={() => handleClick()}>Set Name</button>
      </p>
    </section>
  );
}
