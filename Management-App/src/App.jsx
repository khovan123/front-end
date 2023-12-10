import "./App.css";
import Noprojects from "./components/Noprojects.jsx";
import Aside from "./components/Aside.jsx";
import AddProjects from "./components/AddProjects.jsx";
import { useRef, useState } from "react";
import SelectedProject from "./components/SelectedProject.jsx";
function App() {
  const changeButton = useRef();
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });
  function handleSelectProjects(id) {
    setProjectsState((prevState) => {
      changeButton.current = false;
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }
  function handleStartAddProjects() {
    setProjectsState((preProjectsState) => {
      changeButton.current = true;
      return {
        ...preProjectsState,
        selectedProjectId: null,
      };
    });
  }
  function handleCancelAddProject() {
    setProjectsState((preProjectsState) => {
      changeButton.current = false;
      return {
        ...preProjectsState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProjects(projectData) {
    setProjectsState((preProjectsState) => {
      changeButton.current = false;
      const projectID = Math.random();
      const newproject = {
        ...projectData,
        id: projectID,
      };
      return {
        ...preProjectsState,
        selectedProjectId: undefined,
        projects: [...preProjectsState.projects, newproject],
      };
    });
  }
  function handleExitSelected() {
    setProjectsState((preProjectsState) => {
      return {
        ...preProjectsState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleDeleteProject() {
    setProjectsState((preProjectsState) => {
      return {
        selectedProjectId: undefined,
        projects: preProjectsState.projects.filter(
          (project) => project.id !== selectedProject.id
        ),
      };
    });
  }
  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onExit={handleExitSelected}
    />
  );
  if (projectsState.selectedProjectId === null) {
    content = (
      <AddProjects
        onAdd={handleAddProjects}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = (
      <Noprojects
        onStartAddProjects={handleStartAddProjects}
        projectState={
          projectsState.projects.length > 0
            ? "Choose your project."
            : "You do not have any project before."
        }
      />
    );
  }
  return (
    <>
      <main>
        <Aside
          onStartAddProjects={handleStartAddProjects}
          onChange={changeButton.current}
          projects={projectsState.projects}
          onSelectProject={handleSelectProjects}
          selectedID={selectedProject ? selectedProject.id : ""}
        />
        {content}
      </main>
    </>
  );
}

export default App;
