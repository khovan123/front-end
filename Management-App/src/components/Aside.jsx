export default function Aside({
  onStartAddProjects,
  onChange,
  projects,
  onSelectProject,
  selectedID,
}) {
  return (
    <section className="section-aside">
      <aside className="side-bar">
        <h2>Project</h2>
        <button
          onClick={onStartAddProjects}
          className={onChange ? "active" : undefined}
        >
          + Add project
        </button>
        <ul className="list-project">
          {projects.map((project) => (
            <li key={project.id}>
              <button
                className={project.id === selectedID ? "active" : undefined}
                onClick={() => onSelectProject(project.id)}
              >
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
