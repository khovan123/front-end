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
    tasks: [],
  });
  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectID: prevState.selectedProjectId,
        id: taskId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }
  function handleDeleteTask(selectedTaskId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== selectedTaskId),
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
  function handleCancelAddProject() {
    setProjectsState((preProjectsState) => {
      changeButton.current = false;
      return {
        ...preProjectsState,
        selectedProjectId: undefined,
      };
    });
  }
  function handleSelectProjects(id) {
    setProjectsState((prevState) => {
      changeButton.current = false;
      return {
        ...prevState,
        selectedProjectId: id,
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
  let selectedTalks = projectsState.tasks.filter(
    (task) => task.projectID === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onExit={handleExitSelected}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={selectedTalks}
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
