import { useState } from "react";
import "./index.css";
import "./Player.css";
export default function Player({
  intitialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(intitialName);
  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }
  function handleChange(e) {
    setPlayerName(e.target.value);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        <span className="player-name">
          {isEditing ? (
            <input
              type="text"
              required
              value={playerName}
              onChange={handleChange}
            />
          ) : (
            playerName
          )}
        </span>
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={() => handleEditClick()}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
