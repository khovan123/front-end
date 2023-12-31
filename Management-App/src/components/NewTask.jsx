import { useState } from "react";
export default function NewTask({ onAdd }) {
  const [selectedTask, setSelectedTask] = useState("");
  function handleChange(event) {
    setSelectedTask(event.target.value);
  }
  function handleClick() {
    if (selectedTask.trim() === "") {
      return;
    }
    onAdd(selectedTask);
    setSelectedTask("");
  }
  return (
    <p className="newtask">
      <input onChange={handleChange} type="text" value={selectedTask} />
      <button onClick={handleClick}>Add</button>
    </p>
  );
}
