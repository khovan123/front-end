import { useState } from "react";
export default function Player({ intitialName, symbol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(intitialName);
  function handleEditClick() {
    setIsEditing((editing) => !editing);
  }
  function handleChange(e) {
    setPlayerName(e.target.value);
  }
  return (
    <li>
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
