import logo from "../assets/logo.png";
function Noprojects({ onStartAddProjects, projectState }) {
  return (
    <section className="section-noprojects">
      <div className="noprojects">
        <div className="noprojects-content">
          <img className="img-noprojects" src={logo} alt="image" />
          <h2>{projectState}</h2>
        </div>
        <div className="btn-noprojects">
          <button onClick={onStartAddProjects}>Create your project</button>
        </div>
      </div>
    </section>
  );
}
export default Noprojects;
