import NewTask from "./NewTask";

export default function Task({ tasks, onAdd, onDeleteTask }) {
  return (
    <section className="section-task">
      <h2>Task</h2>
      {tasks.length === 12 ? (
        <p className="sub-text">Please done that tasks!</p>
      ) : (
        <NewTask onAdd={onAdd} />
      )}
      {tasks.length === 0 && (
        <p className="sub-text">You do not have any tasks.</p>
      )}

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
