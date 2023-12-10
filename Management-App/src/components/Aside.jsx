export default function Aside({
  onStartAddProjects,
  onChange,
  projects,
  onSelectProject,
  selectedID,
}) {
  return (
    <section className="section-aside">
      <div className="aside">
        <aside className="side-bar">
          <h2>Project</h2>
          <button
            onClick={onStartAddProjects}
            className={onChange ? "active" : undefined}
          >
            <i className="fa-solid fa-square-plus"></i>Add project
          </button>
          <ul className="list-project">
            {projects.map((project) => (
              <li key={project.id}>
                <button
                  className={project.id === selectedID ? "active" : undefined}
                  onClick={() => onSelectProject(project.id)}
                >
                  {project.id === selectedID ? (
                    <i className="fa-regular fa-folder-open"></i>
                  ) : (
                    <i className="fa-solid fa-folder"></i>
                  )}
                  {project.title}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
