import NewTask from "./NewTask";

export default function Task({ tasks, onAdd, onDeleteTask }) {
  return (
    <section className="section-task">
      <h2>Task</h2>
      <NewTask onAdd={onAdd} />
      {tasks.length === 0 && <p>You do not have any tasks.</p>}
      {tasks.length > 0 && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.text}</span>
              <button onClick={() => onDeleteTask(task.id)}>Clear</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
