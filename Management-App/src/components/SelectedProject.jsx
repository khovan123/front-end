import Task from "./Task";
export default function SelectedProject({
  project,
  onDelete,
  onExit,
  tasks,
  onAddTask,
  onDeleteTask,
}) {
  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <section className="section-selectedProject">
      <div className="selectedProject">
        <header>
          <h2>{project.title}</h2>
          <div className="selectedProject-btn">
            <button onClick={onDelete} className="btn-delete">
              <i className="fa-solid fa-trash"></i>
            </button>
            <button onClick={onExit} className="btn-exit">
              Exit
            </button>
          </div>
        </header>
        <div className="project-content">
          <p className="selectedProject-date">{formattedDate}</p>
          <p className="selectedProject-description">{project.description}</p>
        </div>
      </div>
      <Task tasks={tasks} onAdd={onAddTask} onDeleteTask={onDeleteTask} />
    </section>
  );
}
