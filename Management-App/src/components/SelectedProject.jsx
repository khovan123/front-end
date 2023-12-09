export default function SelectedProject({ project }) {
  const formattedDate = new Date(project.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <section className="section-selectedProject">
      <div className="selectedProject">
        <header>
          <h2>Title: {project.title}</h2>
          <button className="btn-delete">Delete</button>
        </header>
        <p className="selectedProject-date">{formattedDate}</p>
        <p className="selectedProject-description">{project.description}</p>
      </div>
    </section>
  );
}
